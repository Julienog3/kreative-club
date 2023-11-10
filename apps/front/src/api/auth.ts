import { api } from ".";
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
  await fetch(`${import.meta.env.VITE_API_URL}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
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

  const response = await api
    .post("auth/login", {
      json: { email, password },
    })
    .json();

  return loginResponseSchema.parse(response);
};

const logoutUser = async (): Promise<void> => {
  await api.post("auth/logout").json();
};

const getMe = async (): Promise<User> => {
  const userSchema = z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
  });

  const response = await api.get("me").json();
  return userSchema.parse(response);
};

export { registerUser, loginUser, logoutUser, getMe };
