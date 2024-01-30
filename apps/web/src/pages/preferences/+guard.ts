import { getToken } from "../../helpers/localStorage";

export const guard = (pageContext) => {
  // const user = pageContext;
  const token = getToken();
};
