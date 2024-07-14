import { Link } from 'react-router-dom'

export default function Cadastration() {
  return (
    <p className="mt-4 flex flex-col text-center text-xs font-semibold text-roxo-300 sm:text-xs md:text-[0.8rem]">
      Ainda não é cadastrado?{' '}
      <Link className="underline hover:text-roxo-900" to={'/register'}>
        Cadastre-se
      </Link>
    </p>
  )
}
