import { useSnackbarStore } from "#root/src/components/layout/Snackbar/Snackbar.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";

export const createPortfolioFolder = async (
  userId: string,
  payload: FormData,
): Promise<void> => {
  return await api
    .post(`users/${userId}/portfolio/folders`, { body: payload })
    .json();
};

export const useCreatePortfolioFolder = (userId: string) => {
  const queryClient = useQueryClient();

  const { addItem } = useSnackbarStore((state) => state);
  return useMutation({
    mutationFn: (newPortfolioFolder: FormData) =>
      createPortfolioFolder(userId, newPortfolioFolder),
    onSuccess: () => {
      addItem({
        type: "success",
        message: "Le dossier de portfolio a été correctement ajouté.",
      });
      queryClient.invalidateQueries({
        queryKey: ["portfolio", "folders"],
      });
    },
    onError: () => {
      addItem({
        type: "danger",
        message:
          "Un problème est survenu lors de l'ajout du dossier de portfolio",
      });
    },
  });
};
