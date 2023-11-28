import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import UsersPage from "./pages/users/index.page";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

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
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
