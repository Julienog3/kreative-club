import { PageContext } from "vike/types";

export { data };

async function data(pageContext: PageContext) {
  return {
    id: pageContext.routeParams.id,
  };
}
