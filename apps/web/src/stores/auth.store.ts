import { z } from "zod";
import { createStore } from "zustand";
import { devtools } from "zustand/middleware";

const roles = z.enum(["admin", "user"]);

type Role = z.infer<typeof roles>;

const TokenDataSchema = z.object({
  userId: z.string(),
  roles,
});

type TokenData = z.infer<typeof TokenDataSchema>;

type AuthStore = {
  accessToken: string | undefined;
  accessTokenData: TokenData | undefined;
  refreshToken: string | undefined;

  actions: {
    setAccessToken: (accessToken: string | undefined) => void;
    setRefreshToken: (refreshToken: string | undefined) => void;

    init: () => void;
    clearTokens: () => void;
  };
};

export 

const authStore = createStore<AuthStore>()(
  devtools(
    (set, get) => ({
      accessToken: undefined,
      accessTokenData: undefined,
      refreshToken: undefined,

      actions: {
        setAccessToken: (accessToken: string | undefined) => {
          const accessTokenData = (() => {
            
          })
        }
      }
    }),
    {
      name: "auth-store",
      enabled: !import.meta.env.PROD,
    },
  ),
);
