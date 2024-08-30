import { Link } from 'react-router-dom'

export default function Voltar() {
  return (
    <div className="">
      <Link to="/home" className="">
        <p className="text-lg hover:underline font-bold text-gray-600 "> &lt; voltar</p>
      </Link>
    </div>
  )
}
