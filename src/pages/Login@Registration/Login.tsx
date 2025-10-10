import LoginForm from '@/components/login/LoginForm'
import CircuitBottomLeft from '@/components/svgComponents/circuit/CircuitBottomLeft'
import CircuitBottomRight from '@/components/svgComponents/circuit/CircuitBottomRight'
import CircuitTopLeft from '@/components/svgComponents/circuit/CircuitTopLeft'
import CircuitTopRight from '@/components/svgComponents/circuit/CircuitTopRight'
import HeaderLinks from '@/components/header/HeaderLinks'

export default function Login() {
  return (
    <div className="min-w-screen min-h-screen bg-grid-pattern relative flex flex-col items-center justify-center px-6">
      <HeaderLinks />

      <LoginForm />

      <CircuitTopLeft className="absolute left-0 top-28 hidden max-h-[50%] max-w-[50%] xl:block" />
      <CircuitBottomLeft className="absolute bottom-16 left-0 hidden max-h-[50%] max-w-[50%] xl:block" />
      <CircuitTopRight className="absolute right-0 top-32 hidden max-h-[50%] max-w-[50%] xl:block" />
      <CircuitBottomRight className="absolute bottom-0 right-0 hidden max-h-[50%] max-w-[50%] xl:block" />
    </div>
  )
}
