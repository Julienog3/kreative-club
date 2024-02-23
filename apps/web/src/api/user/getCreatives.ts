import { useQuery } from "@tanstack/react-query";
import { api } from "..";
import { User } from "../user";

export const getCreatives = async (): Promise<User[]> => {
  return await api.get("users?portfolio_enabled=1").json();
};

export const useCreativesQuery = () => {
  return useQuery({
    queryKey: ["creatives"],
    queryFn: () => getCreatives(),
  });
};
