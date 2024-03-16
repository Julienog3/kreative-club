import { Category } from "#root/types/category";
import { PortfolioFolder, PortfolioImage } from "#root/types/portfolio";
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
  firstName?: string;
  lastName?: string;
  portfolioEnabled: boolean;
  avatar?: string;
  categories: Category[];
  description?: string;
};

export type UserPayload = User & {
  passwordConfirmation: string;
};

export const getUsers = async (): Promise<User[]> => {
  return await api.get("users").json();
};

export const getUserById = async (id: string): Promise<User> => {
  return await api.get(`users/${id}`).json();
};

export const updateUser = async (
  id: string,
  userPayload: FormData,
): Promise<void> => {
  await api.put(`users/${id}`, {
    body: userPayload,
  });
};

export const getUserPortfolioImages = async (
  id: string,
): Promise<PortfolioImage[]> => {
  return await api.get(`users/${id}/portfolio/images`).json();
};

export const getUserPortfolioFolders = async (
  id: string,
): Promise<PortfolioFolder[]> => {
  return await api.get(`users/${id}/portfolio/folders`).json();
};
