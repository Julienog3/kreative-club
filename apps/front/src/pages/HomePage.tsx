import { center, vstack } from "../../styled-system/patterns"
import { css } from "../../styled-system/css"
import Card from "../components/utils/Card/Card"

function HomePage(): JSX.Element {
  return (
    <main className={center({ height: '100vh', width: 'full', backgroundColor: '#F9F5F2' })}>
        <Card>
          <div className={vstack({ gap: 0 })}>
            <h1 className={css({ textStyle: 'title' })}>Kreative club</h1>
            <p className={css({ textStyle: 'body' })}>Plateforme de freelance pour graphiste</p>
          </div>
        </Card>
      </main>
  )
}

export default HomePage