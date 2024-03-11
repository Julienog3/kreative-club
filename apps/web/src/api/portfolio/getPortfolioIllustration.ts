import { PortfolioImage } from "#root/types/portfolio";
import { useQuery } from "@tanstack/react-query";
import { api } from "..";

export const getPortfolioIllustration = async (
  userId: string,
): Promise<PortfolioImage> => {
  return await api
    .get(`users/${userId}/portfolio/illustration`)
    .json()
    .then((data) => (data as PortfolioImage[])[0]);
};

export const usePortfolioIllustrationQuery = (userId: string) => {
  return useQuery({
    queryKey: ["portfolio-illustration", userId],
    queryFn: () => getPortfolioIllustration(userId),
    enabled: !!userId,
  });
};
