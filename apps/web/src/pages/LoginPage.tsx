import { css } from "../../styled-system/css";
import { vstack } from "../../styled-system/patterns";
import Button from "../components/utils/Button/Button";
import Card from "../components/utils/Card/Card";
import Input from "../components/utils/Input/Input";
import * as z from "zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Credentials } from "../api/auth";
import { useAuth } from "../hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7, { message: "required" }),
});

export default function LoginPage(): JSX.Element {
  const { register, handleSubmit, control } = useForm<FieldValues>({
    resolver: zodResolver(loginSchema),
  });

  const { signIn } = useAuth();

  const { isPending } = signIn;

  const onSubmit: SubmitHandler<FieldValues> = (credentials) =>
    signIn.mutate(credentials as Credentials);

  return (
    <>
      <Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={vstack({ gap: 4, alignItems: "left" })}
        >
          <h2 className={css({ textStyle: "title" })}>Connexion</h2>
          <Input label="email" control={control} register={register} required />
          <Input
            type="password"
            label="password"
            control={control}
            register={register}
            required
          />

          <Button type="submit" disabled={isPending}>
            Se connecter
          </Button>
        </form>
      </Card>
    </>
  );
}
