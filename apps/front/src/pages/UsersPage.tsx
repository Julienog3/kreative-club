import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../api/user"
import Card from "../components/utils/Card/Card"
import { center, vstack } from "../../styled-system/patterns"
import { css } from "../../styled-system/css"
import Button from "../components/utils/Button/Button"

function UsersPage(): JSX.Element {
  const { data: users } = useQuery({ queryKey: ['users'], queryFn: getUsers })

  return (
    <main className={center({ height: '100vh', width: 'full', backgroundColor: '#F9F5F2' })}>
      <Card>
        <div className={vstack({ gap: 4, alignItems: 'left' })}>
          <h2 className={css({ textStyle: 'title' })}>Utilisateurs</h2>
          <ul> 
            {users && users.map(({ username }) => {
              return <li>{username}</li>
            })}
          </ul>
          <Button onClick={(): void => console.log('salut 👋')}>Test</Button>
        </div>
      </Card>
    </main>
    
  )
}

export default UsersPage