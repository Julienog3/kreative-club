import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "..";
import { User } from "../user";

export const getCreatives = async (categories?: string[]): Promise<User[]> => {
  let route = "users?portfolio_enabled=1";
  categories?.forEach((category) => {
    route += `&categories=${category}`;
  });
  return await api.get(route).json();
};

export const useCreativesQuery = (categories?: string[]) => {
  return useSuspenseQuery({
    queryKey: ["creatives"],
    queryFn: () => getCreatives(categories),
  });
};
