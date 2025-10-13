import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/services/api/auth'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../utility/Button'
import FormInput from '../form/FormInput'
import FormTitle from '../form/FormTitle'
import ErrorMessage from '../form/ErrorMessage'
import { useState } from 'react'

const RegisterFormSchema = z.object({
  username: z.string().min(1, { message: 'O campo de nome de usuário é obrigatório' }),
  full_name: z.string().min(1, { message: 'O campo de nome completo é obrigatório' }),
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
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'As senhas não coincidem',
})

type RegisterFormValues = z.infer<typeof RegisterFormSchema>

export default function RegisterForm() {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    mode: 'onBlur',
  })

  async function handleNextStep() {
    // Valida apenas os campos da etapa 1
    const isValid = await trigger(['username', 'full_name'])
    if (isValid) setStep(2)
  }

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
          setError('email', { type: 'manual', message: 'Este e-mail já está em uso' })
        } else if (error.response.data.message === 'The username already exists.') {
          setError('username', { type: 'manual', message: 'Este nome de usuário já está em uso' })
        } else {
          setError('root', {
            type: 'manual',
            message: 'Ocorreu um erro ao tentar registrar. Tente novamente mais tarde.',
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
    <div className="h-auto bg-[#f8f7fc] flex flex-col items-center justify-center border border-roxo-300 rounded mt-8 sm:mt-0 p-8 sm:p-12 min-w-full sm:min-w-[36rem]">
      <FormTitle title="Criar conta" />

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="mt-8 w-full flex flex-col items-center justify-center"
      >
        {step === 1 && (
          <>
            {/* Etapa 1 */}
            <div className="w-full flex flex-col items-start">
              <FormInput
                registerProps={register('username')}
                type="text"
                label="nome de usuário"
              />
              {errors.username && <ErrorMessage error={errors.username.message} />}
            </div>

            <div className="w-full flex flex-col items-start mt-5">
              <FormInput
                registerProps={register('full_name')}
                type="text"
                label="nome completo"
              />
              {errors.full_name && <ErrorMessage error={errors.full_name.message} />}
            </div>

            <Button
              type="button"
              onClick={handleNextStep}
              className="mt-6 w-full"
              text="Próximo"
            />
          </>
        )}

        {step === 2 && (
          <>
            {/* Etapa 2 */}
            <div className="w-full flex flex-col items-start">
              <FormInput
                registerProps={register('email')}
                type="text"
                label="e-mail"
              />
              {errors.email && <ErrorMessage error={errors.email.message} />}
            </div>

            <div className="w-full flex flex-col items-start mt-5">
              <FormInput
                registerProps={register('password')}
                type="password"
                label="senha"
              />
              {errors.password && <ErrorMessage error={errors.password.message} />}
            </div>

            <div className="w-full flex flex-col items-start mt-5">
              <FormInput
                registerProps={register('confirmPassword')}
                type="password"
                label="confirmar senha"
              />
              {errors.confirmPassword && (
                <ErrorMessage error={errors.confirmPassword.message} />
              )}
            </div>

            {errors.root && <ErrorMessage error={errors.root.message} />}

            <div className="flex w-full gap-5 mt-6">
              <Button
                type="button"
                onClick={() => setStep(1)}
                className="w-[30%] bg-roxo-500 border-roxo-500"
                text="Voltar"
              />

              <Button
                disabled={isSubmitting}
                className="w-[70%]"
                text="Cadastrar"
              />
            </div>
          </>
        )}

        <p className="mt-8 flex flex-wrap items-center justify-center gap-1 text-center text-sm text-roxo-500">
          <span>Já tem uma conta?</span>
          <Link
            className="font-semibold text-roxo-300 transition-colors hover:text-roxo-900"
            to={'/'}
          >
            Entrar
          </Link>
        </p>
      </form>
    </div>
  )
}
