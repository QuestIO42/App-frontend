import { Link } from 'react-router-dom';

export default function AlreadyHasAAccount() {
  return (
    <p className="mt-4 text-center text-[0.8em] font-semibold text-roxo-claro">
      Já tem uma conta?{' '}
      <Link className="underline hover:text-roxo-escuro" to={'/'}>
        Faça login
      </Link>
    </p>
  );
}
