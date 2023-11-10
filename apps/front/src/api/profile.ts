import { api } from ".";

export interface Profile {
  userId: number;
  firstName: string;
  lastName: string;
  avatar: {
    url: string;
  };
  isProvider: boolean;
}

export type ProfilePayload = {
  firstName: string;
  lastName: string;
  avatar: string;
  isProvider: boolean;
};

export const getProfileById = async (id: number): Promise<Profile> => {
  const profile = (await api.get(`profiles/${id}`).json()) as Profile;

  profile.avatar.url = `${
    import.meta.env.VITE_API_URL
  }${profile?.avatar.url.slice(1)}`;

  return profile;
};

export const updateProfile = async (
  id: number,
  profilePayload: FormData,
): Promise<void> => {
  await api.put(`users/${id}/profile`, {
    body: profilePayload,
  });
};
