import { User } from "#root/src/api/user";
import {
  useUpdateUser,
  useUpdateUserAvatar,
} from "#root/src/api/user/updateUser";
import { Autocomplete } from "#root/src/components/utils/Autocomplete/Autocomplete";
import Button from "#root/src/components/utils/Button/Button";
import { Dropzone } from "#root/src/components/utils/Dropzone/Dropzone";
import Input from "#root/src/components/utils/Input/Input";
import { grid, gridItem, hstack } from "#root/styled-system/patterns";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";

interface ProfileFormProps {
  user: User;
}

const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  avatar: z.any().optional(),
  categories: z.number().array().optional(),
});

export const CreativeProfileForm = ({ user }: ProfileFormProps) => {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: user,
  });

  const editProfile = useUpdateUser(user.id);

  const onSubmit: SubmitHandler<z.infer<typeof profileSchema>> = (
    profileData,
  ) => {
    editProfile.mutate(profileData);
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    // formState: { isDirty },
  } = form;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={grid({ gap: "1rem", columns: 2, w: "100%" })}
      >
        <div className={gridItem()}>
          <Input label="firstName" control={control} register={register} />
        </div>
        <div className={gridItem()}>
          <Input label="phone" control={control} register={register} />
        </div>
        <div className={gridItem()}>
          <Input label="email" control={control} register={register} />
        </div>
        <div className={gridItem()}>
          <Input label="lastName" control={control} register={register} />
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
          <Button type="submit">Enregistrer</Button>
          <Button onClick={(): void => reset()}>Annuler</Button>
        </div>
      </form>
    </FormProvider>
  );
};
