export { onHydrationEnd };

import type { OnHydrationEndAsync } from "vike/types";

const onHydrationEnd: OnHydrationEndAsync = async (
  pageContext,
): ReturnType<OnHydrationEndAsync> => {
  console.log("The page is now interactive");
};
