import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Outlet } from "react-router-dom";

import { useTransition } from "@react-spring/web";
// import "../i18n";
import Snackbar from "../components/layout/Snackbar/Snackbar";
import Header from "./Header";
import Banner from "../components/layout/Banner/Banner";
import Page from "../components/layout/Page/Page";
// import Footer from "./Footer";
import { css } from "../../styled-system/css";
import React, { PropsWithChildren } from "react";
// import { PageContext } from "vike/types";
import { useStoreAuthModal } from "../components/modals/AuthModal/AuthModal.store";
import { modalTransitionConfig } from "../components/utils/Modal/Modal";
import AuthModal from "../components/modals/AuthModal/AuthModal";
import './index.css'
import Footer from "./Footer";
import { PageContext } from "vike/types";
import { PageContextProvider } from "./usePageContext";

const queryClient = new QueryClient();

export { PageShell }

function PageShell({ children, pageContext }: PropsWithChildren & { pageContext: PageContext }) {
  const isShowed = useStoreAuthModal(({ isShowed }) => isShowed);
  const modalTransition = useTransition(isShowed, modalTransitionConfig);

  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <QueryClientProvider client={queryClient}>
          {modalTransition((style, isOpened) => (
            <>{isOpened && <AuthModal style={{ ...style }} />}</>
          ))} 
          <div className={css({ backgroundColor: "background" })}>
            <Snackbar />
            <Header />
            <Banner />
            <Page>
              {children}
            </Page>
            <Footer />
          </div>
        </QueryClientProvider>
      </PageContextProvider>
    </React.StrictMode>
  );
}

export default PageShell;
