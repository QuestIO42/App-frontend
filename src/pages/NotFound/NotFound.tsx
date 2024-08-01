import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  const goHome = useCallback(() => {
    navigate('/')
  }, [])
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-3xl">404</h1>
      <p>Pagina não encontrada</p>
      <button className="text-roxo-300 hover:text-roxo-900" onClick={goHome}>
        Voltar para a página inicial
      </button>
    </div>
  )
}

export default memo(NotFound)
