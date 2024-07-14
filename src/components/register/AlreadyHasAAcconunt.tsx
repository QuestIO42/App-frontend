import { Link } from 'react-router-dom'

export default function AlreadyHasAAccount() {
  return (
    <p className="mt-4 text-center text-xs font-semibold text-roxo-300 md:text-[0.8em]">
      Já tem uma conta?{' '}
      <Link className="underline hover:text-roxo-900" to={'/'}>
        Faça login
      </Link>
    </p>
  )
}
