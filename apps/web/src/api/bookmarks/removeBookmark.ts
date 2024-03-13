import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";
import { useSnackbarStore } from "#root/src/components/layout/Snackbar/Snackbar.store";

export const removeBookmark = async (
  token: string,
  id: string,
): Promise<void> => {
  return await api
    .delete(`bookmarks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json();
};

export const useRemoveBoomarkQuery = (userToken: string) => {
  const queryClient = useQueryClient();
  const { addItem } = useSnackbarStore((data) => data);

  return useMutation({
    mutationFn: (creativeId: string) => removeBookmark(userToken, creativeId),
    onSuccess: (): void => {
      addItem({
        type: "success",
        message: "Le signet a été correctement supprimé.",
      });
      queryClient.invalidateQueries({
        queryKey: ["bookmarks"],
      });
    },
    onError: (): void => {
      addItem({
        type: "danger",
        message: "Un problème est survenu lors de la suppression du signet.",
      });
    },
  });
};
