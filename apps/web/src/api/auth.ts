import ky from "ky";
import { api } from ".";
import { parseCamelToSnakeCase } from "../helpers/format";
import { User, UserPayload } from "./user";
import { z } from "zod";

export interface Credentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
}

const registerUser = async (user: UserPayload): Promise<void> => {
  const userPayload = parseCamelToSnakeCase(user);

  await fetch(`${import.meta.env.VITE_API_URL}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userPayload),
  });
};

const loginUser = async ({
  email,
  password,
}: Credentials): Promise<LoginResponse> => {
  const loginResponseSchema = z.object({
    token: z.string(),
    type: z.string(),
  });

  const response = await ky
    .post("/_auth/login", { json: { email, password } })
    .json();

  return loginResponseSchema.parse(response);
};

const logoutUser = async (): Promise<void> => {
  await ky.post("/_auth/logout").json();
};

const getMe = async (): Promise<User> => {
  const userSchema = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    avatar: z.any().optional(),
  });

  const response = await api.get("me").json();
  return userSchema.parse(response);
};

export { registerUser, loginUser, logoutUser, getMe };
