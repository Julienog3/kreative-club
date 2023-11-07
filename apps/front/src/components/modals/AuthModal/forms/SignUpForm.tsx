import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registerUser } from "../../../../api/auth";
import { hstack, vstack } from "../../../../../styled-system/patterns";
import Input from "../../../utils/Input/Input";
import Button from "../../../utils/Button/Button";
import { z } from "zod";
import { useStoreModal } from "../../../utils/Modal/Modal.store";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserPayload } from "../../../../api/user";

const userSchema = z
  .object({
    username: z.string().min(3, { message: "Required" }),
    email: z.string().email(),
    password: z.string().min(7, { message: "Required" }),
    passwordConfirmation: z.string().min(7, { message: "Required" }),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords not the same",
      });
    }
  });

const SignUpForm = () => {
  const queryClient = useQueryClient();

  const closeModal = useStoreModal(({ closeModal }) => closeModal);

  const { register, handleSubmit, control } = useForm<FieldValues>({
    resolver: zodResolver(userSchema),
  });

  const signUpUser = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (user) =>
    signUpUser.mutate(user as UserPayload);

  useEffect(() => {
    if (signUpUser.isSuccess) {
      closeModal();
    }
  }, [signUpUser.isSuccess]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={vstack({ w: "100%", gap: 4, alignItems: "left" })}
    >
      <Input label="username" register={register} control={control} required />
      <Input label="email" register={register} control={control} required />
      <Input
        type="password"
        label="password"
        control={control}
        register={register}
        required
      />
      <Input
        type="password"
        label="passwordConfirmation"
        register={register}
        control={control}
        required
      />
      <Button type="submit">S&apos;inscrire</Button>
    </form>
  );
};

export default SignUpForm;
