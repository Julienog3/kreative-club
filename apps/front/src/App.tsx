import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, Link } from 'react-router-dom';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Link to='/'>Home</Link>
      <Link to='/users'>Users</Link>
      <Link to='/users/add'>Add user</Link>
    </QueryClientProvider>
  )
}

export default App
