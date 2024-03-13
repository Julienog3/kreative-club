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
    // Some code
    // reply.clearCookie("token");
    done();
  });

  app.addHook("preHandler", async (request, reply) => {
    const { token } = request.cookies;

    if (token) {
      try {
        const user = await ky
          .get("http://127.0.0.1:3333/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .json();
        request.user = user;
      } catch (error) {
        reply.clearCookie("token");
      }
    }
  });

  app.post("/_auth/login", async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const response = await ky
      .post("http://127.0.0.1:3333/auth/login", {
        json: { email, password },
      })
      .json();

    if (response) {
      reply.setCookie("token", response.token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        path: "/",
      });
    }

    reply.send(response);
  });

  app.post("/_auth/logout", async (request, reply) => {
    const { token } = request.cookies;

    await ky
      .post("http://127.0.0.1:3333/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json();

    reply.clearCookie("token", { path: "/" });
    reply.send();
  });

  app.get("*", async (request, reply) => {
    const user = request.user;
    const { token } = request.cookies;

    const pageContextInit = {
      urlOriginal: request.raw.url || "",
      user,
      userToken: token,
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
  fastify.listen({ port: +port }, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

main();
