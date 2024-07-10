import { useState } from 'react'
import LoginForm from '@/components/login/LoginForm'
import Logo from '@/components/svgComponents/Logo'
import CircuitBottomLeft from '@/components/svgComponents/circuit/CircuitBottomLeft'
import CircuitBottomRight from '@/components/svgComponents/circuit/CircuitBottomRight'
import CircuitTopLeft from '@/components/svgComponents/circuit/CircuitTopLeft'
import CircuitTopRight from '@/components/svgComponents/circuit/CircuitTopRight'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Lógica de Autenticação
  }

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center">
      <Logo
        link="/"
        className="absolute left-8 top-4 z-10 hidden cursor-pointer text-cinza transition duration-300 ease-in-out hover:text-roxo-escuro md:block"
      />
      <LoginForm />
      <CircuitTopLeft className="md:text absolute left-0 top-5 hidden max-h-[30%] max-w-[30%] xl:block" />
      <CircuitBottomLeft className="absolute bottom-5 left-0 hidden max-h-[30%] max-w-[30%] xl:block"></CircuitBottomLeft>
      <CircuitTopRight className="absolute right-0 top-5 hidden max-h-[30%] max-w-[30%] xl:block"></CircuitTopRight>
      <CircuitBottomRight className="absolute bottom-5 right-0 hidden max-h-[30%] max-w-[30%] xl:block"></CircuitBottomRight>
    </div>
  )
}
