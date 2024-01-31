import { api } from ".";
// import { parseCamelToSnakeCase } from "../helpers/format";

export type User = {
  id: string;
  username: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
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

export { getUsers, getUserById, updateUser };
