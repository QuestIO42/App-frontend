import ForgotPassword from '../form/ForgotPassword';
import Button from '../form/Button';
import FormInput from '../form/FormInput';
import FormTitle from '../form/FormTitle';
import ModalSquareForm from '../wrapper/ModalSquareForm';
import AlreadyHasAAccount from './AlreadyHasAAcconunt';

export default function RegisterForm() {
  return (
    <ModalSquareForm>
      <div className="relative m-5 flex max-w-[60%] flex-col items-center justify-center sm:max-w-[70%] md:max-w-[80%] lg:max-w-[90%] xl:max-h-[782px] xl:min-w-[515px]">
        <FormTitle title="Cadastro"></FormTitle>
        <form className="mt-16 flex flex-col items-center justify-center">
          <FormInput type="text" label="nome de usuário"></FormInput>
          <FormInput type="password" label="e-mail"></FormInput>
          <FormInput type="text" label="senha"></FormInput>
          <ForgotPassword></ForgotPassword>
          <FormInput type="password" label="confirmar senha" />
          <Button className="mt-4" text="Cadastrar"></Button>
          <AlreadyHasAAccount></AlreadyHasAAccount>
        </form>
      </div>
    </ModalSquareForm>
  );
}
