import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, loginUser, logoutUser } from "../api/auth";
import { getToken, removeToken, saveToken } from "../helpers/localStorage";
import { useEffect, useState } from "react";

export function useAuth() {
  const queryClient = useQueryClient();
  const [hasToken, setHasToken] = useState<boolean>(false);

  useEffect(() => {
    const token = getToken();

    if (token) {
      setHasToken(true);
    }
  }, []);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    enabled: hasToken,
  });

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
