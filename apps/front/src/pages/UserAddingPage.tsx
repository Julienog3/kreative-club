import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { css } from "../../styled-system/css";
import { hstack, vstack } from "../../styled-system/patterns";
import Button from "../components/utils/Button/Button";
import Card from "../components/utils/Card/Card";
import Input from "../components/utils/Input/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserPayload } from "../api/user";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ButtonWithLink from "../components/utils/ButtonWithLink/ButtonWithLink";
import { registerUser } from "../api/auth";

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

export default function UserAddingPage(): JSX.Element {
  const queryClient = useQueryClient();

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

  return (
    <>
      <Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={vstack({ gap: 4, alignItems: "left" })}
        >
          <h2 className={css({ textStyle: "title" })}>Inscription</h2>

          <Input
            label="username"
            register={register}
            control={control}
            required
          />
          <Input label="email" register={register} control={control} required />
          <div className={hstack()}>
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
          </div>
          <Button type="submit">S&apos;inscrire</Button>
        </form>
        <div className={hstack()}>
          <ButtonWithLink to="/">Home</ButtonWithLink>
          <ButtonWithLink to="/users">Users</ButtonWithLink>
        </div>
      </Card>
    </>
  );
}
