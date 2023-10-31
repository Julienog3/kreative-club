import { parseCamelToSnakeCase } from "../helpers/format";

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type UserPayload = User & {
  passwordConfirmation: string;
};

const getUsers = async (): Promise<User[]> => {
  return await fetch("http://localhost:3333/users").then((res) => res.json());
};

const createUser = async (user: UserPayload): Promise<void> => {
  const userPayload = parseCamelToSnakeCase(user);

  await fetch("http://localhost:3333/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userPayload),
  });
};

export { getUsers, createUser };
