import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import UsersPage from './pages/UsersPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/users',
        element: <UsersPage />
      }
    ]
  }
])

export default router;