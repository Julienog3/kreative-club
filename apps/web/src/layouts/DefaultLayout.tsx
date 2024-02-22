export { Layout };

import { PropsWithChildren } from "react";
import Snackbar from "../components/layout/Snackbar/Snackbar";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import { css } from "#root/styled-system/css";
import { modalTransitionConfig } from "../components/utils/Modal/Modal";
import AuthModal from "../components/modals/AuthModal/AuthModal";
import { useTransition } from "@react-spring/web";
import { useStoreAuthModal } from "../components/modals/AuthModal/AuthModal.store";
import "#root/src/index.css";

function Layout({ children }: PropsWithChildren) {
  const isShowed = useStoreAuthModal(({ isShowed }) => isShowed);
  const modalTransition = useTransition(isShowed, modalTransitionConfig);

  return (
    <>
      {modalTransition((style, isOpened) => (
        <>{isOpened && <AuthModal style={{ ...style }} />}</>
      ))}
      <div className={css({ backgroundColor: "background" })}>
        <Snackbar />
        {/* <Banner /> */}
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
