import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Credentials } from "../../../../api/auth";
import { vstack } from "../../../../../styled-system/patterns";
import Input from "../../../utils/Input/Input";
import Button from "../../../utils/Button/Button";
import { z } from "zod";
import { useEffect } from "react";
import { useSnackbarStore } from "../../../layout/Snackbar/Snackbar.store";
import { useAuth } from "../../../../hooks/useAuth";
import { reload } from "vike/client/router";
import { useStoreAuthModal } from "../AuthModal.store";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginForm = () => {
  const { register, handleSubmit, control } = useForm<FieldValues>({
    resolver: zodResolver(loginSchema),
  });

  const closeModal = useStoreAuthModal(({ closeModal }) => closeModal);
  const addItem = useSnackbarStore(({ addItem }) => addItem);
  const { signIn } = useAuth();

  const { isPending, isSuccess } = signIn;

  const onSubmit: SubmitHandler<FieldValues> = (credentials) => {
    signIn.mutate(credentials as Credentials);
  };

  useEffect(() => {
    if (isSuccess) {
      addItem({
        type: "success",
        message: "Connecté",
      });
      closeModal();
      reload();
    }
  }, [isSuccess]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={vstack({ w: "100%", gap: 10, alignItems: "left" })}
    >
      <div className={vstack({ w: "100%", gap: 4, alignItems: "left" })}>
        <Input label="email" control={control} register={register} required />
        <Input
          type="password"
          label="password"
          control={control}
          register={register}
          required
        />
      </div>
      <Button type="submit" disabled={isPending}>
        Se connecter
      </Button>
    </form>
  );
};

export default LoginForm;
