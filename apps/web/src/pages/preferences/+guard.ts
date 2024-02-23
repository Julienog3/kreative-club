import { render } from "vike/abort";
import { GuardAsync, PageContext } from "vike/types";

export { guard };

const guard: GuardAsync = async (
  pageContext: PageContext,
): ReturnType<GuardAsync> => {
  if (!pageContext.user) {
    throw render("/");
  }
};
