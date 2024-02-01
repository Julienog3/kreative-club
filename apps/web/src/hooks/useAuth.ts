import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, logoutUser } from "../api/auth";
import { saveToken } from "../helpers/localStorage";

export function useAuth() {
  const queryClient = useQueryClient();

  const signIn = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ token }) => {
      saveToken(token);
      // setHasToken(true);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const logout = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });

  return { signIn, logout };
}
