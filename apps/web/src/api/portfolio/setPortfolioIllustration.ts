import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";
import { useSnackbarStore } from "#root/src/components/layout/Snackbar/Snackbar.store";

export const setIllustrationImage = async ({
  userId,
  portfolioImageId,
}: {
  userId: string;
  portfolioImageId: string;
}): Promise<void> => {
  return await api
    .post(`users/${userId}/portfolio/images/${portfolioImageId}/illustration`)
    .json();
};

export const usePortfolioFolderIllustration = (userId: string) => {
  const queryClient = useQueryClient();

  const { addItem } = useSnackbarStore((state) => state);
  return useMutation({
    mutationFn: (portfolioImageId: string) =>
      setIllustrationImage({ userId, portfolioImageId }),
    onSuccess: () => {
      addItem({
        type: "success",
        message: "L'illustration de portfolio a été correctement ajouté.",
      });
      queryClient.invalidateQueries({
        queryKey: ["portfolio", "images"],
      });
    },
    onError: () => {
      addItem({
        type: "danger",
        message:
          "Un problème est survenu lors de l'ajout d'une illustration de portfolio",
      });
    },
  });
};
