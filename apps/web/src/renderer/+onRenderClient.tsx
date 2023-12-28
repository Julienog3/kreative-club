export { onRenderClient };

import { OnRenderClientAsync } from "vike/types";
import PageShell from "./PageShell";
import { hydrateRoot } from "react-dom/client";

async function onRenderClient(
  pageContext: any,
): ReturnType<OnRenderClientAsync> {
  const { Page, pageProps } = pageContext;

  if (!Page) {
    throw new Error(
      "Client-side render() hook expects pageContext.Page to be defined",
    );
  }

  const root = document.getElementById("react-root");

  if (!root) throw new Error("DOM element #react-root not found");

  hydrateRoot(
    root,
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>,
  );
}
