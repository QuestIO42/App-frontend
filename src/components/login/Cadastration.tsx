import { Link } from 'react-router-dom'

export default function Cadastration() {
  return (
    <p className="mt-8 flex flex-wrap items-center justify-center gap-1 text-center text-sm text-roxo-500">
      <span>Ainda não é cadastrado?</span>
      <Link
        to="/register"
        className="font-semibold text-roxo-300 transition-colors hover:text-roxo-900"
      >
        Cadastre-se
      </Link>
    </p>
  )
}
