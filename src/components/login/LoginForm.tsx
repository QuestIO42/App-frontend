import Button from '../form/Button'
import ModalSquareForm from '../wrapper/ModalSquareForm'
import Cadastration from './Cadastration'
import ForgotPassword from '../form/ForgotPassword'
import FormInput from '../form/FormInput'
import FormTitle from '../form/FormTitle'

export default function LoginForm() {
  return (
    <ModalSquareForm>
      <div className="relative flex h-auto max-w-[60%] flex-col items-center justify-center p-5 sm:max-w-[70%] md:max-w-[80%] lg:max-w-[90%] lg:px-10 xl:min-w-[480px]">
        <FormTitle title="Login"></FormTitle>
        <form className="mt-8 flex flex-col items-center justify-center sm:mt-12 md:mt-16">
          <FormInput type="text" label="usuário ou e-mail"></FormInput>
          <FormInput type="password" label="senha"></FormInput>
          <ForgotPassword></ForgotPassword>
          <Button className="mt-4" text="Login"></Button>
        </form>
        <Cadastration></Cadastration>
      </div>
    </ModalSquareForm>
  )
}
