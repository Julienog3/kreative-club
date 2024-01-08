import { PageContextBuiltInServer } from "vike/types";

export default async function onBeforeRender(
  pageContext: PageContextBuiltInServer,
) {
  const id = pageContext.routeParams!.id;

  return {
    pageContext: {
      pageProps: {
        id,
      },
    },
  };
}
