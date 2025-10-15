import { useNavigate } from 'react-router-dom';

export default function Voltar() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="text-2xl hover:underline font-bold text-cinza-500"
      >&lt; voltar
      </button>
    </div>
  );
}
