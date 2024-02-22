import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";
import { useSnackbarStore } from "#root/src/components/layout/Snackbar/Snackbar.store";

export const deleteCategory = async (id: number): Promise<void> => {
  return await api.delete(`categories/${id}`).json();
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { addItem } = useSnackbarStore((data) => data);

  return useMutation({
    mutationFn: (categoryId: number) => deleteCategory(categoryId),
    onSuccess: (): void => {
      addItem({
        type: "success",
        message: "La catégorie a été correctement supprimé.",
      });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (): void => {
      addItem({
        type: "danger",
        message:
          "Un problème est survenu lors de la suppression de la catégorie.",
      });
    },
  });
};
