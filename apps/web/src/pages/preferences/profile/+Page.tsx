import {
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
import { usePageContext } from "../../../renderer/usePageContext";
import { ProfileCard } from "./ProfileCard";
import { useUpdateUser } from "#root/src/api/user/updateUser";
import { Dropzone } from "#root/src/components/utils/Dropzone/Dropzone";

const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  avatar: z.any().optional(),
});

export { Page };

function Page(): JSX.Element {
  const { user } = usePageContext();

  const editProfile = useUpdateUser();

  const methods = useForm<FieldValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: user,
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = methods;

  const onSubmit: SubmitHandler<FieldValues> = (profileData) => {
    const payload = new FormData();

    if (profileData.firstName) {
      payload.append("firstName", profileData.firstName);
    }

    if (profileData.lastName) {
      payload.append("lastName", profileData.lastName);
    }

    console.log({ profileData });

    if (profileData.avatar[0]) {
      payload.append("avatar", profileData.avatar[0]);
    }

    editProfile.mutate({ id: user.id, payload });
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
            <h2 className={css({ textStyle: "title" })}>Profil</h2>
            <ProfileCard user={user} />
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={grid({ gap: "1rem", columns: 2, w: "100%" })}
              >
                <div className={gridItem()}>
                  <Input
                    label="firstname"
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
                    label="lastname"
                    control={control}
                    register={register}
                  />
                </div>
                <div className={gridItem({ colSpan: 2 })}>
                  <Dropzone label="avatar" />
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
