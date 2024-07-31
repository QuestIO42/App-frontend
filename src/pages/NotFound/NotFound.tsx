import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  const goHome = useCallback(() => {
    navigate('/login')
  }, [])
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1>404</h1>
      <p>Pagina não encontrada</p>
      <button onClick={goHome}>Voltar para a página inicial</button>
    </div>
  )
}

export default memo(NotFound)
