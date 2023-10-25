
export type User = {
  id: number
  username: string
  email: string
}

const getUsers = async (): Promise<User[]> => {
  return await fetch('http://localhost:3333/users').then((res) => res.json())
}

export { getUsers }