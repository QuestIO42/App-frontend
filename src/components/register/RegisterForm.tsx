import { z } from 'zod'
import Button from '../utility/Button'
import ForgotPassword from '../form/ForgotPassword'
import FormInput from '../form/FormInput'
import FormTitle from '../form/FormTitle'
import ModalSquareForm from '../utility/ModalSquareForm'
import AlreadyHasAAccount from './AlreadyHasAAcconunt'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorMessage from '../form/ErrorMessage'
import { registerUser } from '@/services/api/auth'
import { useNavigate } from 'react-router-dom'

const RegisterFormSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'O campo de nome de usuário é obrigatório' }),
  full_name: z
    .string()
    .min(1, { message: 'O campo de nome completo é obrigatório' }),
  email: z
    .string()
    .min(1, { message: 'O campo de e-mail é obrigatório' })
    .email({ message: 'O e-mail digitado não é válido' }),
  password: z
    .string()
    .min(1, { message: 'O campo de senha é obrigatório' })
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    .max(20, { message: 'A senha deve ter no máximo 20 caracteres' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'O campo de confirmação de senha é obrigatório' }),
})

const extendedRegisterFormSchema = RegisterFormSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem',
  }
)

type RegisterFormValues = z.infer<typeof extendedRegisterFormSchema>

export default function RegisterForm() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(extendedRegisterFormSchema),
  })

  async function handleRegister({
    username,
    full_name,
    email,
    password,
    confirmPassword: confirm_password,
  }: RegisterFormValues) {
    try {
      await registerUser({ username, full_name, email, password, confirm_password })
      navigate('/')
    } catch (error: any) {
      if (error.response && error.response.data) {
        if (error.response.data.message === 'The email already exists.') {
          setError('email', {
            type: 'manual',
            message: 'Este e-mail já está em uso',
          })
        } else if (
          error.response.data.message === 'The username already exists.'
        ) {
          setError('username', {
            type: 'manual',
            message: 'Este nome de usuário já está em uso',
          })
        } else {
          setError('root', {
            type: 'manual',
            message:
              'Ocorreu um erro ao tentar registrar. Tente novamente mais tarde.',
          })
        }
      } else {
        setError('root', {
          type: 'manual',
          message: 'Erro ao cadastrar usuário. Tente novamente mais tarde.',
        })
      }
    }
  }

  return (
    <ModalSquareForm>
      <div className="relative flex flex-col items-center justify-center p-10 md:px-10 md:py-5 xl:min-w-[32rem]">
        <FormTitle title="Cadastro" />
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="mt-16 flex flex-col items-center justify-center"
        >
          <FormInput
            registerProps={register('username')}
            type="text"
            label="nome de usuário"
          />
          {errors.username && <ErrorMessage error={errors.username.message} />}

          <FormInput
            registerProps={register('full_name')}
            type="text"
            label="nome completo"
          />
          {errors.full_name && <ErrorMessage error={errors.full_name.message} />}
          <FormInput
            registerProps={register('email')}
            type="text"
            label="e-mail"
          />
          {errors.email && <ErrorMessage error={errors.email.message} />}
          <FormInput
            registerProps={register('password')}
            type="password"
            label="senha"
          />
          {errors.password && <ErrorMessage error={errors.password.message} />}
          <FormInput
            registerProps={register('confirmPassword')}
            type="password"
            label="confirmar senha"
          />
          {errors.confirmPassword && (
            <ErrorMessage error={errors.confirmPassword.message} />
          )}
          {errors.root && <ErrorMessage error={errors.root.message} />}
          <Button disabled={isSubmitting} className="mt-4" text="Cadastrar" />
          <AlreadyHasAAccount />
        </form>
      </div>
    </ModalSquareForm>
  )
}
