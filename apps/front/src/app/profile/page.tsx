"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { useSnackbarStore } from "../../components/layout/Snackbar/Snackbar.store";
import { getProfileById, updateProfile } from "../../api/profile";
import { vstack } from "../../../styled-system/patterns";
import Card from "../../components/utils/Card/Card";
import Input from "../../components/utils/Input/Input";
import { css } from "../../../styled-system/css";
import Button from "../../components/utils/Button/Button";

const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  avatar: z.any().optional(),
});

export default function ProfilePage(): JSX.Element {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const addItem = useSnackbarStore(({ addItem }) => addItem);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      if (user) return getProfileById(user?.id);
    },
    enabled: !!user,
  });

  const editProfile = useMutation({
    mutationFn: (payload: FormData) => updateProfile(user!.id, payload),
    onSuccess: () => {
      addItem({ type: "success", message: "Votre profil a bien été modifié" });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      addItem({ type: "danger", message: error.message });
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<FieldValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile,
  });

  const onSubmit: SubmitHandler<FieldValues> = (profileData) => {
    const payload = new FormData();

    if (profileData.firstName) {
      payload.append("firstName", profileData.firstName);
    }

    if (profileData.lastName) {
      payload.append("lastName", profileData.lastName);
    }

    if (profileData.avatar[0]) {
      payload.append("avatar", profileData.avatar[0]);
    }

    editProfile.mutate(payload);
  };

  return (
    <>
      <Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={vstack({ gap: 4, alignItems: "left" })}
        >
          <h2 className={css({ textStyle: "title" })}>Profil</h2>
          <Input label="firstName" control={control} register={register} />
          <Input label="lastName" control={control} register={register} />
          <input type="file" {...register("avatar")} />
          <Button type="submit" disabled={!isDirty || editProfile.isPending}>
            Enregistrer
          </Button>
        </form>
      </Card>
    </>
  );
}
