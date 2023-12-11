"use client"

import { useTransition } from "@react-spring/web";
// import "../i18n";
import { useStoreAuthModal } from "../components/modals/AuthModal/AuthModal.store";
import { modalTransitionConfig } from "../components/utils/Modal/Modal";
import AuthModal from "../components/modals/AuthModal/AuthModal";
import Snackbar from "../components/layout/Snackbar/Snackbar";
import Header from "../components/layout/Header/Header";
import Banner from "../components/layout/Banner/Banner";
import Footer from "../components/layout/Footer/Footer";
import { css } from "../../styled-system/css";
import Page from "../components/layout/Page/Page";
import { PropsWithChildren } from "react";


export default function Template({ children }: PropsWithChildren) {
  const isShowed = useStoreAuthModal(({ isShowed }) => isShowed);
  const modalTransition = useTransition(isShowed, modalTransitionConfig);

  return (
    <>
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
    </>
  );
}