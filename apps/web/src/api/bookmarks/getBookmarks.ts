import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "..";
import { User } from "../user";

export const getBookmarks = async (): Promise<User[]> => {
  return await api
    .get("bookmarks", {
      credentials: "include",
    })
    .json();
};

export const useBookmarksQuery = () => {
  return useSuspenseQuery({
    queryKey: ["bookmarks"],
    queryFn: () => getBookmarks(),
  });
};
