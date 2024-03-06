import { useQuery } from "@tanstack/react-query";
import { api } from "..";
import { User } from "../user";

export const getUser = async (id: string): Promise<User> => {
  return await api.get(`users/${id}`).json();
};

export const useUserQuery = (userId: string) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
};
