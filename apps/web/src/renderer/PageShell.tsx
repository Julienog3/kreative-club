import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../components/layout/Header/Header";
import Page from "../components/layout/Page/Page";
// import { useTransition } from "@react-spring/web";
// import "./i18n";
// import { modalTransitionConfig } from "./components/utils/Modal/Modal";
// import AuthModal from "./components/modals/AuthModal/AuthModal";
// import { useStoreAuthModal } from "./components/modals/AuthModal/AuthModal.store";
import Snackbar from "../components/layout/Snackbar/Snackbar";
import Footer from "../components/layout/Footer/Footer";
import Banner from "../components/layout/Banner/Banner";
import { css } from "../../styled-system/css";
import { PageContext } from "vike/types";
import React, { PropsWithChildren } from "react";
import { PageContextProvider } from "./usePageContext";
import "../index.css";

const queryClient = new QueryClient();

interface PageShellProps {
  pageContext: PageContext;
}

export default function PageShell({
  children,
  pageContext,
}: PageShellProps & PropsWithChildren) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <QueryClientProvider client={queryClient}>
          {/* {modalTransition((style, isOpened) => (
            <>{isOpened && <AuthModal style={{ ...style }} />}</>
          ))} */}
          <div className={css({ backgroundColor: "background" })}>
            <Snackbar />
            <Header />
            <Banner />
            <Page>{children}</Page>
            <Footer />
          </div>
        </QueryClientProvider>
      </PageContextProvider>
    </React.StrictMode>
  );
}
