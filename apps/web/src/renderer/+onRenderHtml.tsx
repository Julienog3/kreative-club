import { escapeInject, dangerouslySkipEscape } from "vike/server";
import { renderToString } from "react-dom/server";
import { OnRenderHtmlAsync } from "vike/types";
import { PageShell } from "./PageShell";

export { onRenderHtml };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function onRenderHtml(pageContext: any): ReturnType<OnRenderHtmlAsync> {
  const { Page, pageProps } = pageContext;

  if (!Page) {
    throw new Error("My render() hook expects pageContext.Page to be defined");
  }

  const pageHtml = await renderToString(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>,
  );

  const { documentProps } = pageContext.exports;
  const title = (documentProps && documentProps.title) || "Kreative club";
  const description =
    (documentProps && documentProps.description) ||
    "Kreative club est une application";

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${description}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {},
  };
}
