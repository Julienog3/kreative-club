import type { Config } from "vike/types";

export default {
  meta: {
    title: {
      // Make the value of `title` available on both the server- and client-side
      env: { server: true, client: true },
    },
    onBeforeRender: {
      env: { server: true, client: true },
    },
  },
  passToClient: ["dehydratedState", "user"],
} satisfies Config;
