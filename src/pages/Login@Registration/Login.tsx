import LoginForm from '@/components/login/LoginForm'
import Logo from '@/components/svgComponents/Logo'
import CircuitBottomLeft from '@/components/svgComponents/circuit/CircuitBottomLeft'
import CircuitBottomRight from '@/components/svgComponents/circuit/CircuitBottomRight'
import CircuitTopLeft from '@/components/svgComponents/circuit/CircuitTopLeft'
import CircuitTopRight from '@/components/svgComponents/circuit/CircuitTopRight'

export default function Login() {
  console.log(import.meta.env.VITE_API_URL)
  return (
    <div className="min-w-screen min-h-screen relative flex items-center justify-center">
      <Logo
        link="https://www.vlab.dc.ufscar.br"
        className="w-16 h-16 absolute left-12 top-12 z-10 cursor-pointer text-roxo-300 transition duration-300 ease-in-out hover:text-roxo-900"
      />

      <LoginForm />

      <CircuitTopLeft className="absolute left-0 top-28 hidden max-h-[50%] max-w-[50%] xl:block" />
      <CircuitBottomLeft className="absolute bottom-16 left-0 hidden max-h-[50%] max-w-[50%] xl:block" />
      <CircuitTopRight className="absolute right-0 top-32 hidden max-h-[50%] max-w-[50%] xl:block" />
      <CircuitBottomRight className="absolute bottom-0 right-0 hidden max-h-[50%] max-w-[50%] xl:block" />
    </div>
  )
}
