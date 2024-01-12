import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getUsers } from "../../api/user";

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
