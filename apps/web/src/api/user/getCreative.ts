import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "..";
import { User } from "../user";

export const getCreative = async (username: string): Promise<User> => {
  return await api.get(`users?username=${username}`).json();
};

export const useCreativeQuery = (username: string) => {
  return useSuspenseQuery({
    queryKey: ["creative", username],
    queryFn: () => getCreative(username),
  });
};
