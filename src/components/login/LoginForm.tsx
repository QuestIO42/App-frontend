import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/useAuth'
import { Link } from 'react-router-dom'
import FormInput from '../form/FormInput'
import Button from '../utility/Button'
import ForgotPassword from '../form/ForgotPassword'
import FormTitle from '../form/FormTitle'
import ErrorMessage from '../form/ErrorMessage'

const emailSchema = z
  .string()
  .min(1, 'O campo de identficação é obrigatório')
  .email('O e-mail digitado não é válido')
const usernameSchema = z.string().min(1, {
  message: 'O campo de identificação é obrigatório',
})
const credentialsSchema = z
  .string()
  .min(1, 'O campo de identificação é obrigatório')
  .superRefine((value, ctx) => {
    if (value.includes('@') || value.includes('.')) {
      // Verificar como email se o input contiver '@' ou '.'
      try {
        emailSchema.parse(value)
      } catch (e) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'O e-mail digitado não é válido',
        })
      }
    } else {
      // Verificar como username se não contiver '@' ou o '.'
      try {
        usernameSchema.parse(value)
      } catch (e) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'O username é inválido. Deve ter pelo menos 3 caracteres.',
        })
      }
    }
  })
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

  async function handleLogin({
    credentials: login,
    password,
  }: LoginFormValues) {
    try {
      await signIn({ login, password })
    } catch (error: any) {
      console.error(error)
      setError('root', {
        type: 'manual',
        message: 'Usuário ou senha inválidos',
      })
    }
  }

  return (
    <div className="h-auto bg-[#f8f7fc] flex flex-col items-center justify-center border border-roxo-300 rounded mt-16 sm:mt-0 p-8 sm:p-12 min-w-full sm:min-w-[36rem]">
      <FormTitle title="Login"/>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="mt-8 w-full flex flex-col items-center justify-center sm:mt-12"
      >
        <div className="w-full flex flex-col items-start">
          <FormInput
            registerProps={register('credentials')}
            type="text"
            label="Usuário ou e-mail"
          />
          {errors.credentials && (
            <ErrorMessage error={errors.credentials.message} />
          )}
        </div>

        <div className="w-full flex flex-col items-start mt-6">
          <FormInput
            registerProps={register('password')}
            type="password"
            label="Senha"
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
          className="mt-4 w-full"
          text="Entrar"
        />

        <p className="mt-8 flex flex-wrap items-center justify-center gap-1 text-center text-sm text-roxo-500">
          <span>Ainda não é cadastrado?</span>
          <Link
            to="/register"
            className="font-semibold text-roxo-300 transition-colors hover:text-roxo-900"
          >
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  )
}
