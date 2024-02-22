import { getCategories } from "#root/src/api/categories/getCategories";
import { QueryClient, dehydrate } from "@tanstack/react-query";

export default async function onBeforeRender() {
  console.log("before render page !");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const dehydratedState = dehydrate(queryClient);

  return {
    pageContext: {
      dehydratedState,
      pageProps: {},
    },
  };
}
