export { Layout };

import { PropsWithChildren } from "react";
import { useTransition } from "@react-spring/web";
import "#root/src/index.css";
import { useStoreAuthModal } from "#root/src/components/modals/AuthModal/AuthModal.store";
import AuthModal from "#root/src/components/modals/AuthModal/AuthModal";
import Snackbar from "#root/src/components/layout/Snackbar/Snackbar";
// import Banner from "#root/src/components/layout/Banner/Banner";
import Header from "#root/src/components/layout/Header/Header";
import { modalTransitionConfig } from "#root/src/components/utils/Modal/Modal";
import { Sidebar } from "#root/src/components/layout/admin/Sidebar";
import { hstack, vstack } from "#root/styled-system/patterns";

function Layout({ children }: PropsWithChildren) {
  const isShowed = useStoreAuthModal(({ isShowed }) => isShowed);
  const modalTransition = useTransition(isShowed, modalTransitionConfig);

  return (
    <>
      {modalTransition((style, isOpened) => (
        <>{isOpened && <AuthModal style={{ ...style }} />}</>
      ))}
      <div
        className={hstack({
          backgroundColor: "background",
          gap: 0,
          alignItems: "start",
          minH: "screen",
        })}
      >
        <Snackbar />
        <Sidebar />
        <div className={vstack({ w: "100%", ml: "15rem", minH: "screen" })}>
          <Header />
          <div
            className={vstack({
              minHeight: "100vh",
              width: "100%",
              maxWidth: "breakpoint-xl",
              margin: "0 auto",
              p: "1.5rem",
            })}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
