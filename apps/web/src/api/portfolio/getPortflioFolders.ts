import { PortfolioImage } from "#root/types/portfolio";
import { useQuery } from "@tanstack/react-query";
import { api } from "..";

export const getUserPortfolioFolders = async (
  id: string,
): Promise<PortfolioImage[]> => {
  return await api.get(`users/${id}/portfolio/folders`).json();
};

export const usePortfolioFolders = (userId: string) => {
  return useQuery({
    queryKey: ["portfolio", "folders"],
    queryFn: () => getUserPortfolioFolders(userId),
  });
};
