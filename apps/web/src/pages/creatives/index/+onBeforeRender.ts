import { getUsers } from "#root/src/api/user";
import { QueryClient, dehydrate } from "@tanstack/react-query";

export default async function onBeforeRender() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const dehydratedState = dehydrate(queryClient);

  return {
    pageContext: {
      dehydratedState,
      pageProps: {},
    },
  };
}
