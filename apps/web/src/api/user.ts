import { PortfolioImage } from "#root/types/portfolio";
import { api } from ".";
// import { parseCamelToSnakeCase } from "../helpers/format";

export enum Role {
  Admin = "admin",
  User = "user",
}

export type User = {
  id: string;
  role: Role;
  username: string;
  email: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  avatar?: {
    url: string;
  };
};

export type UserPayload = User & {
  passwordConfirmation: string;
};

const getUsers = async (): Promise<User[]> => {
  return await api.get("users").json();
};

const getUserById = async (id: string): Promise<User> => {
  return await api.get(`users/${id}`).json();
};

const updateUser = async (id: string, userPayload: FormData): Promise<void> => {
  await api.put(`users/${id}`, {
    body: userPayload,
  });
};

const getUserPortfolioImages = async (
  id: string,
): Promise<PortfolioImage[]> => {
  return await api.get(`users/${id}/portfolio-images`).json();
};

export { getUsers, getUserById, updateUser, getUserPortfolioImages };
