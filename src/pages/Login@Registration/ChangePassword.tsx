import { updateUser } from '@/services/api/user'
import { z } from 'zod'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/useAuth'
import FormTitle from '@/components/form/FormTitle'
import FormInput from '@/components/form/FormInput'
import ErrorMessage from '@/components/form/ErrorMessage'
import Button from '@/components/utility/Button'
import HeaderLinks from '@/components/header/HeaderLinks'

// Verificação das condições de senha
const ChangePasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: 'O campo de senha é obrigatório' })
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
      .max(20, { message: 'A senha deve ter no máximo 20 caracteres' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'O campo de confirmação de senha é obrigatório' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type ChangePasswordFormValues = z.infer<typeof ChangePasswordSchema>

export default function ChangePasswordForm() {
  const navigate = useNavigate()
  const { user } = useAuth();
  const { verificationCode } = useParams();

  console.log("VERIFICATION: " + verificationCode)

  const {
    handleSubmit,
    setError,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  async function handlePassword({ password, confirmPassword }: ChangePasswordFormValues) {
    try {
      await updateUser({
        updateUser: { password, confirmPassword },
        verificationCode: verificationCode || ""
      });

      navigate('/');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Ocorreu um erro ao tentar redefinir a senha. Tente novamente mais tarde.';
      setError('root', {
        type: 'manual',
        message: errorMessage,
      });
    }
  }

  return (
    <div className="min-w-screen min-h-screen bg-grid-pattern relative flex flex-col items-center justify-center px-6">
      <HeaderLinks />

      <div className="h-auto bg-[#f8f7fc] flex flex-col items-center justify-center border border-roxo-300 rounded mt-16 sm:mt-0 p-8 sm:p-12 min-w-full sm:min-w-[36rem]">
        <FormTitle title="Nova senha" />

        <form
          onSubmit={handleSubmit(handlePassword)}
          className="mt-8 w-full flex flex-col items-center justify-center"
        >
          <div className="w-full flex flex-col items-start">
            <FormInput
              registerProps={register('password')}
              type="password"
              label="senha"
            />

            {errors.password && (
              <ErrorMessage error={errors.password.message} />
            )}
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

          <Button
            disabled={isSubmitting}
            className="mt-6 mb-4 w-full"
            text="Alterar Senha"
          />
        </form>
      </div>
    </div>
  )
}
