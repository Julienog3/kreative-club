import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Page from "./components/layout/Page/Page";
import { useTransition } from "@react-spring/web";
import "./i18n";
import { modalTransitionConfig } from "./components/utils/Modal/Modal";
import AuthModal from "./components/modals/AuthModal/AuthModal";
import { useStoreAuthModal } from "./components/modals/AuthModal/AuthModal.store";

const queryClient = new QueryClient();

function App() {
  const isShowed = useStoreAuthModal(({ isShowed }) => isShowed);
  const modalTransition = useTransition(isShowed, modalTransitionConfig);

  return (
    <QueryClientProvider client={queryClient}>
      {modalTransition((style, isOpened) => (
        <>{isOpened && <AuthModal style={{ ...style }} />}</>
      ))}
      <Header />
      <Page>
        <Outlet />
      </Page>
    </QueryClientProvider>
  );
}

export default App;
