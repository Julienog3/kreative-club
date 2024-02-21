import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";
import { useSnackbarStore } from "#root/src/components/layout/Snackbar/Snackbar.store";

export const createPortfolioImage = async (
  userId: string,
  payload: FormData,
): Promise<void> => {
  return await api
    .post(`users/${userId}/portfolio/images`, { body: payload })
    .json();
};

type useCreatePortfolioImageProps = {
  userId: string;
  portfolioFolderId?: string;
};

export const useCreatePortfolioImage = ({
  userId,
  portfolioFolderId,
}: useCreatePortfolioImageProps) => {
  const queryClient = useQueryClient();
  const { addItem } = useSnackbarStore();

  const queryKey = portfolioFolderId
    ? ["portfolio", "folders"]
    : ["portfolio", "images"];

  return useMutation({
    mutationFn: (newPortfolioImage: FormData) => {
      return createPortfolioImage(userId, newPortfolioImage);
    },
    onSuccess: () => {
      addItem({
        type: "success",
        message: "L'image de portfolio a correctement été ajouté.",
      });
      queryClient.invalidateQueries({
        queryKey,
      });
    },
    onError: () => {
      addItem({
        type: "danger",
        message: "Un problème est survenu lors de l'ajout de l'image.",
      });
    },
  });
};
