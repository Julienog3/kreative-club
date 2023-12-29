export { onRenderClient };

import { OnRenderClientAsync } from "vike/types";
import { PageShell } from "./PageShell";
import { Root, createRoot, hydrateRoot } from "react-dom/client";
import { getTitle } from "../pages/utils";

let root: Root;
async function onRenderClient(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageContext: any,
): ReturnType<OnRenderClientAsync> {
  const { Page, pageProps } = pageContext;

  if (!Page) {
    throw new Error(
      "Client-side render() hook expects pageContext.Page to be defined",
    );
  }

  const page = (
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );

  const container = document.getElementById("page-view")!;
  document.title = getTitle(pageContext);

  if (pageContext.isHydration) {
    root = hydrateRoot(container, page);
  } else {
    if (!root) {
      root = createRoot(container);
    }
    root.render(page);
  }
}
