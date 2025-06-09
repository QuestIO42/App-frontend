import LoginForm from '@/components/login/LoginForm'
import Logo from '@/components/svgComponents/Logo'
import CircuitBottomLeft from '@/components/svgComponents/circuit/CircuitBottomLeft'
import CircuitBottomRight from '@/components/svgComponents/circuit/CircuitBottomRight'
import CircuitTopLeft from '@/components/svgComponents/circuit/CircuitTopLeft'
import CircuitTopRight from '@/components/svgComponents/circuit/CircuitTopRight'

export default function Login() {
  console.log(import.meta.env.VITE_API_URL)
  return (
    <div className="min-w-screen relative flex min-h-screen items-center justify-center">
      <Logo
        link="https://www.vlab.dc.ufscar.br"
        className="hover:text-roxo-escuro absolute left-8 top-4 z-10 cursor-pointer text-cinza transition duration-300 ease-in-out"
      />
      <div className="mb-14 sm:mb-0">
        <LoginForm />
      </div>

      <CircuitTopLeft className="absolute left-0 top-5 hidden max-h-[50%] max-w-[50%] xl:block" />
      <CircuitBottomLeft className="absolute bottom-5 left-0 hidden max-h-[50%] max-w-[50%] xl:block" />
      <CircuitTopRight className="absolute right-0 top-5 hidden max-h-[50%] max-w-[50%] xl:block" />
      <CircuitBottomRight className="absolute bottom-5 right-0 hidden max-h-[50%] max-w-[50%] xl:block" />
    </div>
  )
}
