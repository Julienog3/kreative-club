import React, { createContext, useContext } from "react";
import { PageContext } from "vike/types";

interface PageContextProviderProps {
  pageContext: PageContext;
  children: React.ReactNode;
}

export { PageContextProvider };
export { usePageContext };

const Context = createContext<PageContext>({} as PageContext);

function PageContextProvider({
  pageContext,
  children,
}: PageContextProviderProps) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

function usePageContext() {
  const pageContext = useContext(Context);
  return pageContext;
}
