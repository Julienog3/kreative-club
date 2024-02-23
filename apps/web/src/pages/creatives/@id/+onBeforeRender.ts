export default async function onBeforeRender(pageContext) {
  const id = pageContext.routeParams!.id;

  return {
    pageContext: {
      pageProps: {
        id,
      },
    },
  };
}
