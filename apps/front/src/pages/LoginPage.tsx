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
  password: z.string().min(7, { message: "Required" }),
});

export default function LoginPage(): JSX.Element {
  const { register, handleSubmit } = useForm<FieldValues>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const onSubmit: SubmitHandler<FieldValues> = (credentials) =>
    login(credentials as Credentials);

  return (
    <>
      <Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={vstack({ gap: 4, alignItems: "left" })}
        >
          <h2 className={css({ textStyle: "title" })}>Connexion</h2>
          <Input label="email" register={register} required />
          <Input
            type="password"
            label="password"
            register={register}
            required
          />
          <Button type="submit">Se connecter</Button>
        </form>
      </Card>
    </>
  );
}
