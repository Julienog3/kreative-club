import { PortfolioImage } from "#root/types/portfolio";
import { useQuery } from "@tanstack/react-query";
import { api } from "..";

export const getUserPortfolioImages = async (
  id: string,
): Promise<PortfolioImage[]> => {
  return await api.get(`users/${id}/portfolio/images`).json();
};

export const usePortfolioImages = (userId: string) => {
  return useQuery({
    queryKey: ["portfolio", "images"],
    queryFn: () => getUserPortfolioImages(userId),
  });
};
