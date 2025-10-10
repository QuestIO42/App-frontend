import { Link } from 'react-router-dom'

export default function Cadastration() {
  return (
    <p className="mt-8 gap-2 flex flex-row text-center text-sm text-cinzaClaro">
      Ainda não é cadastrado?
      <Link className="text-roxo-300 hover:text-roxo-900 font-semibold" to={'/register'}>
        Cadastre-se
      </Link>
    </p>
  )
}
