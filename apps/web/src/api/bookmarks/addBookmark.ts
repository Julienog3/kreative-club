import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";
import { useSnackbarStore } from "#root/src/components/layout/Snackbar/Snackbar.store";

export const addBookmark = async (token: string, id: string): Promise<void> => {
  return await api
    .post(`bookmarks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json();
};

export const useAddBoomarkQuery = (userToken: string) => {
  const queryClient = useQueryClient();
  const { addItem } = useSnackbarStore((data) => data);

  return useMutation({
    mutationFn: (creativeId: string) => addBookmark(userToken, creativeId),
    onSuccess: (): void => {
      addItem({
        type: "success",
        message: "Le signet a été correctement ajouté.",
      });
      queryClient.invalidateQueries({
        queryKey: ["bookmarks"],
      });
    },
    onError: (): void => {
      addItem({
        type: "danger",
        message: "Un problème est survenu lors de l'ajout du signet.",
      });
    },
  });
};
