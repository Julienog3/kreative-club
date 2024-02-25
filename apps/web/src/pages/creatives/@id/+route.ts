import { RouteSync } from "vike/types";

export { route };

import partRegex from "part-regex";

const route: RouteSync = (pageContext): ReturnType<RouteSync> => {
  if (!partRegex`/creatives/`.test(pageContext.urlPathname)) {
    return false;
  }

  const id = pageContext.urlPathname.split("/")[2];

  return {
    routeParams: {
      id: id,
    },
  };
};
