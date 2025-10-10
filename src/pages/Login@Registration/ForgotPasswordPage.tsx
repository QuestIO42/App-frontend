import ForgotPasswordForm from '@/components/forgotPassword/ForgotPasswordForm'
import Logo from '@/components/svgComponents/Logo'

export default function ForgotPassword() {

  return (
    <div className="min-w-screen min-h-screen bg-grid-pattern relative flex flex-col items-center justify-center px-6 pb-16">
      <div className="w-full absolute top-0 z-50 p-7 sm:p-12">
        <Logo
          link="https://www.vlab.dc.ufscar.br"
          className="w-[52px] sm:w-[64px] aspect-square cursor-pointer text-roxo-300 transition duration-300 ease-in-out hover:text-roxo-900"
        />
      </div>

      <ForgotPasswordForm />
    </div>
  )
}
