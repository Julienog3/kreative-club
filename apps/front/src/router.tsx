import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import UsersPage from "./pages/UsersPage";
import HomePage from "./pages/HomePage";
import UserAddingPage from "./pages/UserAddingPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/users/add",
        element: <UserAddingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
