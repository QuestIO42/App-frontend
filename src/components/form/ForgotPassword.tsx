import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  return (
    <div className="ml-auto mb-4 text-sm underline text-roxo-500">
      <Link className="hover:text-roxo-900" to="/forgotPassword">
        Esqueceu a senha?
      </Link>
    </div>
  )
}
