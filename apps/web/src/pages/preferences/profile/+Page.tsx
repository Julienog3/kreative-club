import {
  Controller,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Card from "../../../components/utils/Card/Card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  grid,
  gridItem,
  hstack,
  vstack,
} from "../../../../styled-system/patterns";
import Button from "../../../components/utils/Button/Button";
import Input from "../../../components/utils/Input/Input";
import { css } from "../../../../styled-system/css";
import { PreferencesLayout } from "../../../components/layout/PreferencesLayout/PreferencesLayout";
import { usePageContext } from "vike-react/usePageContext";
import { ProfileCard } from "./ProfileCard";
import {
  useUpdateUser,
  useUpdateUserAvatar,
} from "#root/src/api/user/updateUser";
import { Dropzone } from "#root/src/components/utils/Dropzone/Dropzone";
import { Autocomplete } from "#root/src/components/utils/Autocomplete/Autocomplete";

const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  avatar: z.any().optional(),
  categories: z
    .object({
      id: z.number(),
      title: z.string(),
    })
    .array(),
});

export { Page };

function Page(): JSX.Element {
  const { user } = usePageContext();

  const editProfile = useUpdateUser(user.id);
  const uploadAvatarProfile = useUpdateUserAvatar(user.id);

  const methods = useForm<FieldValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { ...user, categories: [1, 2] },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = methods;

  const onSubmit: SubmitHandler<FieldValues> = (profileData) => {
    const { avatar, ...payload } = profileData;

    if (avatar[0]) {
      const avatarPayload = new FormData();
      avatarPayload.append("avatar", profileData.avatar[0]);
      uploadAvatarProfile.mutate(avatarPayload);
    }

    editProfile.mutate(payload);
  };

  return (
    <>
      <PreferencesLayout>
        <Card css={{ width: "100%", height: "100%", p: ".5rem" }}>
          <div
            className={vstack({
              w: "100%",
              alignItems: "flex-start",
              p: "1rem",
              height: "100%",
            })}
          >
            <h2 className={css({ textStyle: "title" })}>Profil</h2>
            <ProfileCard user={user} />
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={grid({ gap: "1rem", columns: 2, w: "100%" })}
              >
                <div className={gridItem()}>
                  <Input
                    label="firstName"
                    control={control}
                    register={register}
                  />
                </div>
                <div className={gridItem()}>
                  <Input label="phone" control={control} register={register} />
                </div>
                <div className={gridItem()}>
                  <Input label="email" control={control} register={register} />
                </div>
                <div className={gridItem()}>
                  <Input
                    label="lastName"
                    control={control}
                    register={register}
                  />
                </div>
                <div className={gridItem({ colSpan: 2 })}>
                  <Dropzone label="avatar" />
                </div>
                <div className={gridItem({ colSpan: 2 })}>
                  <Controller
                    control={control}
                    name="categories"
                    render={({ field }) => <Autocomplete {...field} />}
                  />
                </div>
                <div className={hstack()}>
                  <Button
                    type="submit"
                    disabled={!isDirty || editProfile.isPending}
                  >
                    Enregistrer
                  </Button>
                  <Button onClick={(): void => reset()}>Annuler</Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </Card>
      </PreferencesLayout>
    </>
  );
}
