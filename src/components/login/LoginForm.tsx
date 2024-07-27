import { useForm } from 'react-hook-form'
import FormInput from '../form/FormInput'
import Button from '../form/Button'
import ForgotPassword from '../form/ForgotPassword'
import FormTitle from '../form/FormTitle'
import ModalSquareForm from '../wrapper/ModalSquareForm'
import Cadastration from './Cadastration'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorMessage from '../form/ErrorMessage'
import { useAuth } from '@/context/AuthProvider'

const LoginFormSchema = z.object({
  email: z
    .string({
      required_error: 'O campo de e-mail é obrigatório',
    })
    .email({
      message: 'O e-mail digitado não é válido',
    }),
  password: z
    .string({
      required_error: 'O campo de senha é obrigatório',
    })
    .min(6, {
      message: 'A senha deve ter no mínimo 6 caracteres',
    })
    .max(20, { message: 'A senha deve ter no máximo 20 caracteres' }),
})

type LoginFormValues = z.infer<typeof LoginFormSchema>

export default function LoginForm() {
  const { signIn } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(LoginFormSchema) })

  async function handleLogin(data: LoginFormValues) {
    await signIn(data)
  }

  return (
    <ModalSquareForm>
      <div className="relative flex h-auto flex-col items-center justify-center p-10 md:px-10 md:py-10 xl:min-w-[30rem]">
        <FormTitle title="Login"></FormTitle>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="mt-8 flex flex-col items-center justify-center sm:mt-12 md:mt-16"
        >
          <div className="flex flex-col items-start">
            <FormInput
              registerProps={register('email')}
              type="text"
              label="usuário ou e-mail"
            />
            {errors.email && ErrorMessage({ error: errors.email.message })}
          </div>
          <div className="flex flex-col items-start">
            <FormInput
              registerProps={register('password')}
              type="password"
              label="senha"
            />
            {errors.password &&
              ErrorMessage({ error: errors.password.message })}
          </div>

          <ForgotPassword></ForgotPassword>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="mt-4"
            text="Login"
          ></Button>
          <Cadastration></Cadastration>
        </form>
      </div>
    </ModalSquareForm>
  )
}
