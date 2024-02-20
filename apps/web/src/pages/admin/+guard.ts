import { Role } from "#root/src/api/user";
import { redirect } from "vike/abort";
import { GuardAsync, PageContext } from "vike/types";

export { guard };

const guard: GuardAsync = async (
  pageContext: PageContext,
): ReturnType<GuardAsync> => {
  if (!pageContext.user) {
    throw redirect("/");
  }

  if (pageContext.user.role !== Role.Admin) {
    throw redirect("/");
  }
};
