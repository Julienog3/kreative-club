import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";
import { useSnackbarStore } from "#root/src/components/layout/Snackbar/Snackbar.store";
// import { useConfirmStore } from "#root/src/stores/confirm.store";

export const deletePortfolioImage = async (
  userId: string,
  portfolioImageId: string,
): Promise<void> => {
  return await api
    .delete(`users/${userId}/portfolio/images/${portfolioImageId}`)
    .json();
};

export const useDeletePortfolioImage = (userId: string) => {
  const queryClient = useQueryClient();
  const { addItem } = useSnackbarStore((data) => data);
  // const { openModal } = useConfirmStore((data) => data);

  // const queryKey = portfolioFolderId ? ["portfolio-folders"] : ["portfolio"];

  return useMutation({
    mutationFn: (portfolioImageId: string) =>
      deletePortfolioImage(userId, portfolioImageId),
    onSuccess: (): void => {
      addItem({
        type: "success",
        message: "L'image a été correctement supprimé.",
      });
      queryClient.invalidateQueries({
        queryKey: ["portfolio"],
      });
    },
    onError: (): void => {
      addItem({
        type: "danger",
        message: "Un problème est survenu lors de la suppression de l'image.",
      });
    },
  });
};
