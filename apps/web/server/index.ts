import Fastify from "fastify";
import { renderPage } from "vike/server";
import { root } from "./root.js";
import ky from "ky";

const isProduction = process.env.NODE_ENV === "production";

const development = {
  logger: false,
};

const production = {
  logger: false,
};

async function buildServer() {
  const app = Fastify(isProduction ? production : development);

  await app.register(import("@fastify/compress"), { global: true });
  await app.register(import("@fastify/formbody"));
  await app.register(import("@fastify/cookie"));

  if (isProduction) {
    // In production, we need to serve our static assets ourselves.
    // (In dev, Vite's middleware serves our static assets.)
    await app.register(import("@fastify/static"), {
      root: root + "/dist/client/assets",
      prefix: "/assets/",
    });
  } else {
    // We instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We instantiate it only in development. (It isn't needed in production and it
    // would unnecessarily bloat our production server.)
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        server: {
          middlewareMode: true,
          // hmr: {
          //   protocol: 'wss',
          //   clientPort: 443,
          //   port: 443,
          // }
        },
      })
    ).middlewares;

    // this is middleware for vite's dev server
    app.addHook("onRequest", async (request, reply) => {
      const next = () =>
        new Promise<void>((resolve) => {
          viteDevMiddleware(request.raw, reply.raw, () => resolve());
        });
      await next();
    });
  }

  app.addHook("onError", (request, reply, error, done) => {
    done();
  });

  app.addHook("preHandler", async (request) => {
    // if (!request.originalUrl.endsWith("pageContext.json")) {
    //   return;
    // }

    try {
      const user = await ky
        .get("http://127.0.0.1:3333/auth/me", {
          headers: {
            Cookie: Object.entries(request.cookies)
              .map(([name, value]) => `${name}=${value}`)
              .join(";"),
          },
        })
        .json();

      request.user = user;
    } catch (error) {
      console.log(error);
    }
  });

  app.post("/_auth/login", async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const response = await ky.post("http://127.0.0.1:3333/auth/login", {
      json: { email, password },
      credentials: "same-origin",
    });

    response.headers.getSetCookie().forEach((setCookie) => {
      reply.header("Set-Cookie", setCookie);
    });
  });

  app.post("/_auth/logout", async (request, reply) => {
    const response = await ky.post("http://127.0.0.1:3333/auth/logout", {
      headers: {
        Cookie: Object.entries(request.cookies)
          .map(([name, value]) => `${name}=${value}`)
          .join(";"),
      },
    });

    response.headers.getSetCookie().forEach((setCookie) => {
      reply.clearCookie(setCookie.split("=")[0]);
    });
  });

  app.get("*", async (request, reply) => {
    const user = request.user;

    const pageContextInit = {
      urlOriginal: request.raw.url || "",
      user,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) {
      reply.callNotFound();
      return;
    } else {
      const { headers } = httpResponse;
      headers.forEach(([name, value]) => reply.raw.setHeader(name, value));

      httpResponse.pipe(reply.raw);
      return reply;
    }
  });

  return app;
}

async function main() {
  const fastify = await buildServer();

  const port = process.env.PORT || 3000;
  fastify.listen({ port: +port, host: "127.0.0.1" }, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

main();
