import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../api/user"

function UsersPage(): JSX.Element {
  const { data: users } = useQuery({ queryKey: ['users'], queryFn: getUsers })

  return (
    <ul> 
      {users && users.map(({ username }) => {
        return <li>{username}</li>
      })}
    </ul>
  )
}

export default UsersPage