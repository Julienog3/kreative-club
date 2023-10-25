import { center, vstack } from '../styled-system/patterns'
import { css } from '../styled-system/css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Card from './components/utils/Card/Card';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={center({ height: '100vh', width: 'full', backgroundColor: '#F9F5F2' })}>
        <Card>
          <div className={vstack({ gap: 0 })}>
            <h1 className={css({ textStyle: 'title' })}>Kreative club</h1>
            <p className={css({ textStyle: 'body' })}>Plateforme de freelance pour graphiste</p>
          </div>
        </Card>
      </main>
    </QueryClientProvider>
  )
}

export default App
