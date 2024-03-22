import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, logoutUser } from "../api/auth";

export function useAuth() {
  const queryClient = useQueryClient();

  const signIn = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      // saveToken(token);
      // setHasToken(true);
      console.log("signed in");
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
