import type { Config } from "vike/types";

// https://vike.dev/config
export default {
  // clientRouting: true,
  passToClient: ["pageProps", "urlPathname"],
} satisfies Config;
