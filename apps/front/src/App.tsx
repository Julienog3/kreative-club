import { center, vstack } from '../styled-system/patterns'
import { css } from '../styled-system/css';

function App() {

  return (
    <main className={center({ height: '100vh', width: 'full', backgroundColor: '#F9F5F2' })}>
      <div 
        className={css({ 
          border: '3px solid #000', 
          boxShadow: '4px 4px 0px #000', 
          borderRadius: '13px',
          bgColor: '#fff',
          padding: 8
        })}
      >
        <div className={vstack({ gap: 0 })}>
          <h1 className={css({ textStyle: 'title' })}>Kreative club</h1>
          <p className={css({ textStyle: 'body' })}>Plateforme de freelance pour graphiste</p>
        </div>
      </div>
    </main>
  )
}

export default App
