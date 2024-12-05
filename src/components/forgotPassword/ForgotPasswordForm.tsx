import Button from '../utility/Button'
import ModalSquareForm from '../utility/ModalSquareForm'
import FormInput from '../form/FormInput'
import FormTitle from '../form/FormTitle'
import Information from './Infomation'
import { useState } from 'react'
import { forgotPassword } from '@/services/api/auth'

export default function ForgotPasswordForm() {

  const [email, setEmail] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const response = forgotPassword(email)
      console.log(response)
    }
    catch(error: any) {
      console.log(error)
    }
  }

  return (
    <ModalSquareForm>
      <div className="relative flex flex-col items-center justify-center p-5 lg:px-14 lg:py-10 xl:min-w-[30rem]">
        <FormTitle title="Recuperar senha"></FormTitle>
        <Information></Information>
        <form className="mt-8 flex flex-col items-center justify-center sm:mt-12 md:mt-16">
          <div className="mb-4">
         <label className="mb-2 block font-mono text-sm font-semibold text-preto-texto sm:text-[12px] md:text-base lg:text-base">
           {"email"}
         </label>
      <input
        className={`border-2 border-roxo-300 px-2 py-1 text-base font-semibold text-preto-texto shadow-default-roxo-300 focus:border-roxo-900 focus:shadow-roxo-900 sm:border-[2.5px] sm:px-3 sm:text-lg md:border-4 md:px-4 md:text-xl lg:text-2xl`}
        type="text"
        onChange={handleChange}
      />
    </div>
          <Button className="mt-4" text="Enviar" onClick={handleClick} value={email} ></Button>
        </form>
      </div>
    </ModalSquareForm>
  )
}
