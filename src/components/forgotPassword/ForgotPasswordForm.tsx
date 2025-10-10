import { useState } from 'react'
import { forgotPassword } from '@/services/api/auth'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import Button from '../utility/Button'
import FormTitle from '../form/FormTitle'
import ErrorMessage from '../form/ErrorMessage'
import RecoveryLink from '../login/RecoveryLink'
import FormInput from '../form/FormInput'

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
      <div className="absolute top-24">
        {showRecoveryLink && <RecoveryLink text="Link de Recuperação enviado"/>}
      </div>

      <div className="h-auto bg-[#f8f7fc] flex flex-col items-center justify-center border border-roxo-300 rounded mt-16 sm:mt-0 p-8 sm:p-12 min-w-full sm:min-w-[36rem]">
        <FormTitle title="Recuperar senha"/>

        <p className="w-full text-cinzaClaro mt-3 text-start text-sm">
          Informe o e-mail da sua conta
        </p>

        <form className="mt-8 w-full flex flex-col items-center justify-center" onSubmit={handleSubmit(handleClick)}>
          <div className="w-full flex flex-col items-start">
            <FormInput
              registerProps={register('email')}
              type="text"
              label="E-mail"
            />
            {errors.email &&  <ErrorMessage error={errors.email.message}/>}
          </div>

          <Button type="submit" disabled={isSubmitting} className="my-4 w-full" text="Enviar"></Button>
        </form>
      </div>
    </>
  )
}
