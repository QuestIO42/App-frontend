import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  return (
    <div className="ml-auto pb-4 text-xs font-bold text-roxo-claro sm:pb-5 sm:text-sm md:pb-6 md:text-base">
      <Link className="hover:text-roxo-escuro" to="/forgotPassword">
        esqueceu a senha?
      </Link>
    </div>
  );
}
