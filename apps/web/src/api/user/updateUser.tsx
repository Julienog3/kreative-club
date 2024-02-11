import { useSnackbarStore } from "#root/src/components/layout/Snackbar/Snackbar.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";
import { reload } from "vike/client/router";

export const updateUser = async (
  id: string,
  userPayload: FormData,
): Promise<void> => {
  await api.put(`users/${id}`, {
    body: userPayload,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { addItem } = useSnackbarStore((state) => state);
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: FormData }) =>
      updateUser(id, payload),
    onSuccess: () => {
      addItem({ type: "success", message: "Votre profil a bien été modifié" });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      reload();
    },
    onError: (error) => {
      addItem({ type: "danger", message: error.message });
    },
  });
};
