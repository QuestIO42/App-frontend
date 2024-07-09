import Button from '../form/Button';
import ModalSquareForm from '../wrapper/ModalSquareForm';
import FormInput from '../form/FormInput';
import FormTitle from '../form/FormTitle';
import Information from './Infomation';

export default function ForgotPasswordForm() {
  return (
    <ModalSquareForm>
      <div className="relative m-10 flex h-auto max-w-[60%] flex-col items-center justify-center sm:max-w-[70%] md:max-w-[80%] lg:max-w-[90%] lg:px-10 xl:min-w-[480px]">
        <FormTitle title="Recuperar senha"></FormTitle>
        <Information></Information>
        <form className="mt-8 flex flex-col items-center justify-center sm:mt-12 md:mt-16">
          <FormInput type="text" label="usuário ou e-mail"></FormInput>
          <Button className="mt-4" text="Login"></Button>
        </form>
      </div>
    </ModalSquareForm>
  );
}
