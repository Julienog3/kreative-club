import Fastify from "fastify";
import { renderPage } from "vike/server";
import { root } from "./root.js";
import { api } from "../src/api";
import ky from "ky";

const isProduction = process.env.NODE_ENV === "production";

const development = {
  logger: true,
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

  app.post("/_auth/login", async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const user = await ky
      .post("http://127.0.0.1:3333/auth/login", {
        json: { email, password },
      })
      .json();

    if (user) {
      reply.setCookie("email", email, {
        maxAge: 24 * 60 * 60 * 1000, // One day
        httpOnly: true, // Only the server can read the cookie
      });
    }
    const success = !!user;
    reply.send({ success });
  });

  app.get("*", async (request, reply) => {
    const pageContextInit = {
      urlOriginal: request.raw.url || "",
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
