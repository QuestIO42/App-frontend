import { useForm } from 'react-hook-form'
import FormInput from '../form/FormInput'
import Button from '../utility/Button'
import ForgotPassword from '../form/ForgotPassword'
import FormTitle from '../form/FormTitle'
import ModalSquareForm from '../utility/ModalSquareForm'
import Cadastration from './Cadastration'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorMessage from '../form/ErrorMessage'
import { useAuth } from '@/context/AuthProvider'

const emailSchema = z
  .string()
  .min(1, "O campo de identficação é obrigatório")
  .email("O e-mail digitado não é válido")
const usernameSchema =z
  .string()
  .min(1, {
  message: 'O campo de identificação é obrigatório' })
  const credentialsSchema = z
  .string()
  .min(1, "O campo de identificação é obrigatório")
  .superRefine((value, ctx) => {
    if (value.includes('@') || value.includes('.')) {
      // Verificar como email se o input contiver '@' ou '.'
      try {
        emailSchema.parse(value);
      } catch (e) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "O e-mail digitado não é válido",
        });
      }
    } else {
      // Verificar como username se não contiver '@' ou o '.'
      try {
        usernameSchema.parse(value);
      } catch (e) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "O username é inválido. Deve ter pelo menos 3 caracteres.",
        });
      }
    }
  });
const LoginFormSchema = z.object({
  credentials: credentialsSchema,
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
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(LoginFormSchema) })

  async function handleLogin({ credentials : username, password }: LoginFormValues) {
    try {
      await signIn({ username, password })
    } catch (error: any) {
      console.error(error, 'dsfds')
      setError('root', {
        type: 'manual',
        message: 'Usuário ou senha inválidos',
      })
    }
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
              registerProps={register('credentials')}
              type="text"
              label="usuário ou e-mail"
            />
            {errors.credentials && <ErrorMessage error={errors.credentials.message} />}
          </div>
          <div className="flex flex-col items-start">
            <FormInput
              registerProps={register('password')}
              type="password"
              label="senha"
            />
            {errors.password && (
              <ErrorMessage error={errors.password.message} />
            )}
          </div>

          <ForgotPassword />
          <div className="ml-auto mr-auto">
            {errors.root && <ErrorMessage error={errors.root.message} />}
          </div>

          <Button
            disabled={isSubmitting}
            type="submit"
            className="mt-4"
            text="login"
          />
          <Cadastration />
        </form>
      </div>
    </ModalSquareForm>
  )
}
