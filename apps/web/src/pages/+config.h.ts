import type { Config } from "vike/types";
import vikeReact from "vike-react/config";
import vikeReactQuery from "vike-react-query/config";
import { Layout } from "#root/src/layouts/DefaultLayout";
import { Head } from "#root/src/layouts/DefaultHead";

export default {
  Layout,
  Head,
  title: "Kreative club app",
  clientRouting: true,
  passToClient: ["user", "userToken", "routeParams"],
  extends: [vikeReact, vikeReactQuery],
} satisfies Config;
