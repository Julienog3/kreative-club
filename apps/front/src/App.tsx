import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Page from "./components/layout/Page/Page";

import "./i18n";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Page>
        <Outlet />
      </Page>
    </QueryClientProvider>
  );
}

export default App;
