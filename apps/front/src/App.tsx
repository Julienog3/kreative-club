import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Page from "./components/layout/Page/Page";
import { useTransition } from "@react-spring/web";
import "./i18n";
import { modalTransitionConfig } from "./components/utils/Modal/Modal";
import AuthModal from "./components/modals/AuthModal/AuthModal";
import { useStoreAuthModal } from "./components/modals/AuthModal/AuthModal.store";
import Snackbar from "./components/layout/Snackbar/Snackbar";
import Footer from "./components/layout/Footer/Footer";
import Banner from "./components/layout/Banner/Banner";
import { css } from "../styled-system/css";

const queryClient = new QueryClient();

function App() {
  const isShowed = useStoreAuthModal(({ isShowed }) => isShowed);
  const modalTransition = useTransition(isShowed, modalTransitionConfig);

  return (
    <QueryClientProvider client={queryClient}>
      {modalTransition((style, isOpened) => (
        <>{isOpened && <AuthModal style={{ ...style }} />}</>
      ))}
      <div className={css({ backgroundColor: "background" })}>
        <Snackbar />
        <Header />
        <Banner />
        <Page>
          <Outlet />
        </Page>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
