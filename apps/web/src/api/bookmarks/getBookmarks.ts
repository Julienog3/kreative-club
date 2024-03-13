import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "..";
import { User } from "../user";

export const getBookmarks = async (token: string): Promise<User[]> => {
  return await api
    .get("bookmarks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json();
};

export const useBookmarksQuery = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["bookmarks"],
    queryFn: () => getBookmarks(token),
  });
};
