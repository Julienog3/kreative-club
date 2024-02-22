import { useSnackbarStore } from "#root/src/components/layout/Snackbar/Snackbar.store";
import { CategoryDTO } from "#root/types/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";

export const createCategory = async (payload: CategoryDTO): Promise<void> => {
  return await api.post("categories", { json: payload }).json();
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const { addItem } = useSnackbarStore((state) => state);
  return useMutation({
    mutationFn: (newCategory: CategoryDTO) => createCategory(newCategory),
    onSuccess: () => {
      addItem({
        type: "success",
        message: "La catégorie a été correctement ajouté.",
      });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: () => {
      addItem({
        type: "danger",
        message: "Un problème est survenu lors de l'ajout de la catégorie.",
      });
    },
  });
};
