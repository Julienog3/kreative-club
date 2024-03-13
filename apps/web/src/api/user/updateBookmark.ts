import { api } from "..";

export const addBookmark = async (creativeId: string): Promise<void> => {
  return await api.post(`users/${creativeId}/bookmark`).json();
};

export const removeBookmark = async (creativeId: string): Promise<void> => {
  return await api.delete(`users/${creativeId}/bookmark`).json();
};
