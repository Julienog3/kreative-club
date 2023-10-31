import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { css } from "../../styled-system/css"
import { center, hstack, vstack } from "../../styled-system/patterns"
import Button from "../components/utils/Button/Button"
import Card from "../components/utils/Card/Card"
import Input from "../components/utils/Input/Input"
import { QueryClient, useMutation } from "@tanstack/react-query"
import {  UserPayload, createUser } from "../api/user"
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'

const userSchema = z.object({
  username: z.string().min(3, { message: 'Required' }),
  email: z.string().email(),
  password: z.string().min(7, { message: 'Required' }),
  passwordConfirmation: z.string().min(7, { message: 'Required' }),
}).superRefine(({ password, passwordConfirmation }, ctx) => {
  if (password !== passwordConfirmation) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords not the same'
    })
  }
})

export default function UserAddingPage(): JSX.Element {
  const queryClient = new QueryClient();

  const { register, handleSubmit }= useForm<FieldValues>({ resolver: zodResolver(userSchema)});

  

  const addingUser = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  })
  
  const onSubmit: SubmitHandler<FieldValues> = (user) => addingUser.mutate(user as UserPayload)
  
  return (
    <main className={center({ height: '100vh', width: 'full', backgroundColor: '#F9F5F2' })}>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className={vstack({ gap: 4, alignItems: 'left' })}>
          <h2 className={css({ textStyle: 'title' })}>Ajout utilisateur</h2>

          <Input label="username" register={register} required />
          <Input label="email" register={register} required />
          <div className={hstack()}>  
            <Input type="password" label="password" register={register} required />
            <Input type="password" label="passwordConfirmation" register={register} required />
          </div>
          <Button type="submit">Créer</Button>
        </form>
      </Card>
    </main>
  )

}