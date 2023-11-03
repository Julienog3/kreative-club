import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Credentials, getMe, loginUser } from "../api/auth";
import { saveToken } from "../helpers/localStorage";

const queryClient = new QueryClient();

export function useAuth() {
  const user = null;

  // const getCurrentUser = () => {};
  const signInUser = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ token }) => {
      saveToken(token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const login = (credentials: Credentials) => {
    signInUser.mutate(credentials);
  };

  return { user, login };
}
