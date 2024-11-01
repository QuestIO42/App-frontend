import Button from '../utility/Button'
import ModalSquareForm from '../utility/ModalSquareForm'
import FormInput from '../form/FormInput'
import FormTitle from '../form/FormTitle'
import Information from './Infomation'

export default function ForgotPasswordForm() {
  return (
    <ModalSquareForm>
      <div className="relative flex flex-col items-center justify-center p-5 lg:px-14 lg:py-10 xl:min-w-[30rem]">
        <FormTitle title="Recuperar senha"></FormTitle>
        <Information></Information>
        <form className="mt-8 flex flex-col items-center justify-center sm:mt-12 md:mt-16">
          <FormInput type="text" label="usuário ou e-mail"></FormInput>
          <Button className="mt-4" text="Enviar"></Button>
        </form>
      </div>
    </ModalSquareForm>
  )
}
