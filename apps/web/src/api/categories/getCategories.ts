import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "..";
import { Category } from "#root/types/category";

export const getCategories = async (): Promise<Category[]> => {
  return await api.get("categories").json();
};

export const useCategories = () => {
  return useSuspenseQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};
