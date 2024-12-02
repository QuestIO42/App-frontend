import { changePassword } from '@/services/api/auth'
import Logo from '@/components/svgComponents/Logo'
import CircuitBottomRight from '@/components/svgComponents/circuit/CircuitBottomRight'
import CircuitTopLeft from '@/components/svgComponents/circuit/CircuitTopLeft'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import FormTitle from '@/components/form/FormTitle'
import ModalSquareForm from '@/components/utility/ModalSquareForm'
import { useNavigate } from 'react-router-dom'
import { ChangePasswordValues } from '@/interfaces/ChangePasswordValues'
import FormInput from '@/components/form/FormInput'
import ErrorMessage from '@/components/form/ErrorMessage'
import Button from '@/components/utility/Button'

const ChangePasswordSchema = z.object({
  password: z
    .string()
    .min(1, { message: 'O campo de senha é obrigatório' })
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    .max(20, { message: 'A senha deve ter no máximo 20 caracteres' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'O campo de confirmação de senha é obrigatório' }),
})

type ChangePasswordFormValues = z.infer<typeof ChangePasswordSchema>

export default function ChangePasswordForm() {
  const navigate = useNavigate()
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(ChangePasswordSchema),
  })

  async function handlePassword({
    password,
    confirmPassword,
  }: ChangePasswordFormValues) {
    try {
      await changePassword({ password, confirmPassword });
      navigate('/');
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError('root', {
          type: 'manual',
          message:
            'Ocorreu um erro ao tentar recuperar a senha. Tente novamente mais tarde.',
        });
      }
    }
  }

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center">
      <Logo
        link="/"
        className="absolute left-8 top-4 z-10 cursor-pointer text-cinza transition duration-300 ease-in-out hover:text-roxo-900"
      />
      <div className="mb-14 mt-14">
      <ModalSquareForm>
      <div className="relative flex flex-col items-center justify-center p-10 md:px-10 md:py-5 xl:min-w-[32rem]">
        <FormTitle title="Redefinir senha" />
        <form
          onSubmit={handleSubmit(handlePassword)}
          className="mt-12 flex flex-col items-center justify-center"
        >
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
          <Button disabled={isSubmitting} className="mt-4" text="Alterar Senha" />
        </form>
      </div>
    </ModalSquareForm>
      </div>

      <CircuitTopLeft className="md:text absolute left-0 top-5 hidden max-h-[30%] max-w-[30%] xl:block" />
      <CircuitBottomRight className="absolute bottom-5 right-0 hidden max-h-[30%] max-w-[30%] xl:block"></CircuitBottomRight>
    </div>
  )
}

