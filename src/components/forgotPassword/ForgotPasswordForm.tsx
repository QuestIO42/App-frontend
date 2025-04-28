import Button from '../utility/Button'
import ModalSquareForm from '../utility/ModalSquareForm'
import FormTitle from '../form/FormTitle'
import Information from './Information'
import { forgotPassword } from '@/services/api/auth'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorMessage from '../form/ErrorMessage'
import RecoveryLink from '../login/RecoveryLink'
import { useState } from 'react'

const EmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "O campo de identificação é obrigatório" })
    .email({ message: "O e-mail digitado não é válido" }),
});

type EmailSchemaType = z.infer<typeof EmailSchema>;

export default function ForgotPasswordForm() {
  const [showRecoveryLink, setShowRecoveryLink] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailSchemaType>({
    resolver: zodResolver(EmailSchema)
  })

  const handleClick = async (data: EmailSchemaType) => {
    try {
      const response = await forgotPassword(data.email)
      console.log(response)
      setShowRecoveryLink(true);
    }
    catch(error: any) {
      console.log(error)
    }
  }

  // const [email, setEmail] = useState<string>('')

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(event.target.value)
  // }

  return (
    <>
   <div className="relative flex flex-col gap-16 mt-14 items-center justify-center p-5 lg:px-14 lg:py-10 xl:min-w-[30rem]">
    <div className="absolute top-[-63px]">
    {showRecoveryLink && <RecoveryLink
      text="Link de Recuperação enviado"
       />}
       </div>
    <ModalSquareForm>
      <div className="relative flex flex-col items-center justify-center p-5 lg:px-14 lg:py-10 xl:min-w-[30rem]">
        <FormTitle title="Recuperar senha"></FormTitle>
        <Information></Information>

        <form className="mt-4 flex flex-col items-center justify-center sm:mt-10 md:mt-8" onSubmit={handleSubmit(handleClick)}>
          <div className="mb-4">
            <label className="mb-2 block font-mono text-sm font-semibold text-preto-texto sm:text-[12px] md:text-base lg:text-base">
              {"email"}
            </label>

            <input
              {...register('email', {
                required: 'O campo do e-mail é obrigatório'
              })}
              className={`border-2 border-roxo-300 px-2 py-1  text-base font-semibold text-preto-texto shadow-default-roxo-300 focus:border-roxo-900 focus:shadow-roxo-900 sm:border-[2.5px] sm:px-3 sm:text-lg md:border-4 md:px-4 md:text-xl lg:text-2xl`}
              type="text"
            />

            <div className="ml-auto mt-4 mr-auto">
              {errors.email &&  <ErrorMessage error={errors.email.message}/>}
            </div>

          </div>
          <Button type="submit" disabled={isSubmitting} className="mt-4" text="Enviar"></Button>
        </form>
      </div>
    </ModalSquareForm>
    </div>
    </>
  )
}
