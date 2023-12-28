import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, loginUser, logoutUser } from "../api/auth";
import { getToken, removeToken, saveToken } from "../helpers/localStorage";
import { useEffect, useState } from "react";
import { useSnackbarStore } from "../components/layout/Snackbar/Snackbar.store";

export function useAuth() {
  const queryClient = useQueryClient();
  const [hasToken, setHasToken] = useState<boolean>(false);
  const addItem = useSnackbarStore(({ addItem }) => addItem);

  useEffect(() => {
    const token = getToken();

    if (token) {
      setHasToken(true);
    }
  }, []);

  const { data: user, error: userError } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    enabled: hasToken,
  });

  if (userError) {
    addItem({ type: "danger", message: userError.message });
  }

  const signIn = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ token }) => {
      saveToken(token);
      setHasToken(true);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const logout = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      removeToken();
      setHasToken(false);
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });

  return { user, signIn, logout };
}
