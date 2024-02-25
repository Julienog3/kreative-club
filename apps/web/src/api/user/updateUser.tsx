import { useSnackbarStore } from "#root/src/components/layout/Snackbar/Snackbar.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";
import { reload } from "vike/client/router";
import { UserDTO } from "#root/types/user";

export const updateUser = async (
  id: string,
  userPayload: UserDTO,
): Promise<void> => {
  await api.put(`users/${id}`, {
    json: userPayload,
  });
};

export const uploadUserAvatar = async (
  id: string,
  payload: FormData,
): Promise<void> => {
  await api.post(`users/${id}/avatar`, {
    body: payload,
  });
};

export const useUpdateUser = (userId: string) => {
  const queryClient = useQueryClient();

  const { addItem } = useSnackbarStore((state) => state);
  return useMutation({
    mutationFn: (payload: UserDTO) => updateUser(userId, payload),
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

export const useUpdateUserAvatar = (userId: string) => {
  const queryClient = useQueryClient();

  const { addItem } = useSnackbarStore((state) => state);
  return useMutation({
    mutationFn: (payload: FormData) => uploadUserAvatar(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      reload();
    },
    onError: (error) => {
      addItem({ type: "danger", message: error.message });
    },
  });
};
