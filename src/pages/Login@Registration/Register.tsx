import RegisterForm from '@/components/register/RegisterForm'
import Logo from '@/components/svgComponents/Logo'
import CircuitBottomRight from '@/components/svgComponents/circuit/CircuitBottomRight'
import CircuitTopLeft from '@/components/svgComponents/circuit/CircuitTopLeft'

export default function Register() {
  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center">
      <Logo
        link="/"
        className="absolute left-8 top-4 z-10 cursor-pointer text-cinza transition duration-300 ease-in-out hover:text-roxo-900"
      />
      <div className="mb-14 mt-14">
        <RegisterForm />
      </div>

      <CircuitTopLeft className="md:text absolute left-0 top-5 hidden max-h-[30%] max-w-[30%] xl:block" />
      <CircuitBottomRight className="absolute bottom-5 right-0 hidden max-h-[30%] max-w-[30%] xl:block"></CircuitBottomRight>
    </div>
  )
}
