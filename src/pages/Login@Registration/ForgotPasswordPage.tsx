import ForgotPasswordForm from '@/components/forgotPassword/ForgotPasswordForm'
import CircuitLeft from '@/components/svgComponents/circuit/CircuitLeft'
import CircuitRight from '@/components/svgComponents/circuit/CircuitRight'
import CircuitTop from '@/components/svgComponents/circuit/CircuitTop'
import CircuitBottom from '@/components/svgComponents/circuit/CircuitBottom'
import HeaderLinks from '@/components/header/HeaderLinks'

export default function ForgotPassword() {

  return (
    <div className="min-w-screen min-h-screen bg-grid-pattern relative flex flex-col items-center justify-center px-6 pb-16">
      <HeaderLinks />
      <ForgotPasswordForm />

      <CircuitTop className="absolute left-0 top-32 hidden max-h-[40%] max-w-[22%] xl:block" />
      <CircuitLeft className="absolute bottom-0 left-0 hidden max-h-[40%] max-w-[25%] xl:block" />
      <CircuitRight className="absolute right-0 top-32 hidden max-h-[30%] max-w-[25%] xl:block" />
      <CircuitBottom className="absolute bottom-0 right-0 hidden max-h-[55%] max-w-[22%] xl:block" />
    </div>
  )
}
