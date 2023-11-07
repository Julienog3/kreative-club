import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Credentials } from "../../../../api/auth";
import { vstack } from "../../../../../styled-system/patterns";
import Input from "../../../utils/Input/Input";
import Button from "../../../utils/Button/Button";
import { useAuth } from "../../../../hooks/useAuth";
import { z } from "zod";
import { useStoreModal } from "../../../utils/Modal/Modal.store";
import { useEffect } from "react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7, { message: "required" }),
});

const LoginForm = () => {
  const { register, handleSubmit, control } = useForm<FieldValues>({
    resolver: zodResolver(loginSchema),
  });

  const closeModal = useStoreModal(({ closeModal }) => closeModal);
  const { signIn } = useAuth();

  const { isPending, isSuccess } = signIn;

  const onSubmit: SubmitHandler<FieldValues> = (credentials) => {
    signIn.mutate(credentials as Credentials);
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
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
