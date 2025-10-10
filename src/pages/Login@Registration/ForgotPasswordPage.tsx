import ForgotPasswordForm from '@/components/forgotPassword/ForgotPasswordForm'
import HeaderLinks from '@/components/header/HeaderLinks'

export default function ForgotPassword() {

  return (
    <div className="min-w-screen min-h-screen bg-grid-pattern relative flex flex-col items-center justify-center px-6 pb-16">
      <HeaderLinks />
      <ForgotPasswordForm />
    </div>
  )
}
