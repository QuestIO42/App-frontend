import { Link } from 'react-router-dom';

export default function Cadastration() {
  return (
    <p className="mt-4 flex flex-col text-center text-[0.8em] font-semibold text-roxo-claro sm:text-xs md:text-[0.8rem]">
      Ainda não é cadastrado?{' '}
      <Link className="underline hover:text-roxo-escuro" to={'/register'}>
        Cadastre-se
      </Link>
    </p>
  );
}
