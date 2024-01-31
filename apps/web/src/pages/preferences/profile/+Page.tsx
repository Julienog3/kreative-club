import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Card from "../../../components/utils/Card/Card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { vstack } from "../../../../styled-system/patterns";
import Button from "../../../components/utils/Button/Button";
import Input from "../../../components/utils/Input/Input";
import { useAuth } from "../../../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { css } from "../../../../styled-system/css";
import { useSnackbarStore } from "../../../components/layout/Snackbar/Snackbar.store";
import { PreferencesLayout } from "../../../components/layout/PreferencesLayout/PreferencesLayout";
import { updateUser } from "../../../api/user";

const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  avatar: z.any().optional(),
});

export default function PortfolioPage(): JSX.Element {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const addItem = useSnackbarStore(({ addItem }) => addItem);

  const editProfile = useMutation({
    mutationFn: (payload: FormData) => updateUser(user!.id, payload),
    onSuccess: () => {
      addItem({ type: "success", message: "Votre profil a bien été modifié" });
      queryClient.invalidateQueries({ queryKey: ["user"] });
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
    defaultValues: user,
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
      <PreferencesLayout>
        <Card css={{ width: "100%", height: "100%" }}>
          <div
            className={vstack({
              w: "100%",
              alignItems: "flex-start",
              p: "1rem",
              height: "100%",
            })}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={vstack({ gap: 4, alignItems: "left" })}
            >
              <h2 className={css({ textStyle: "title" })}>Profil</h2>
              <Input label="firstName" control={control} register={register} />
              <Input label="lastName" control={control} register={register} />
              <input type="file" {...register("avatar")} />
              <Button
                type="submit"
                disabled={!isDirty || editProfile.isPending}
              >
                Enregistrer
              </Button>
            </form>
          </div>
        </Card>
      </PreferencesLayout>
    </>
  );
}
