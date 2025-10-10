import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  return (
    <div className="ml-auto mb-4 text-sm font-semibold text-roxo-300">
      <Link className="hover:text-roxo-900" to="/forgotPassword">
        Esqueceu a senha?
      </Link>
    </div>
  )
}
