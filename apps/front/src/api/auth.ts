import { parseCamelToSnakeCase } from "../helpers/format";
import { UserPayload } from "./user";

export interface Credentials {
  email: string;
  password: string;
}

const registerUser = async (user: UserPayload): Promise<void> => {
  const userPayload = parseCamelToSnakeCase(user);

  await fetch(`${import.meta.env.VITE_API_URL}register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userPayload),
  });
};

const loginUser = async ({ email, password }: Credentials): Promise<void> => {
  const loginPayload = parseCamelToSnakeCase({ email, password });

  await fetch(`${import.meta.env.VITE_API_URL}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginPayload),
  });
};

export { registerUser, loginUser };
