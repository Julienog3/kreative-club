import { useSnackbarStore } from "#root/src/components/layout/Snackbar/Snackbar.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";
import { reload } from "vike/client/router";

export const enablePortfolio = async (
  token: string,
  isEnabled: boolean,
): Promise<void> => {
  await api.post(`portfolio/enable`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    json: { isEnabled },
  });
};

export const useEnablePortfolioQuery = (token: string) => {
  const queryClient = useQueryClient();
  const { addItem } = useSnackbarStore((state) => state);

  return useMutation({
    mutationFn: (isEnabled: boolean) => enablePortfolio(token, isEnabled),
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
