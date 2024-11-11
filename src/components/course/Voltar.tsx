import { Link } from 'react-router-dom'

export default function Voltar() {
  return (
    <div className="">
      <Link to="/home" className="">
        <p className="text-2xl hover:underline font-bold text-cinzaClaro "> &lt; voltar</p>
      </Link>
    </div>
  )
}
