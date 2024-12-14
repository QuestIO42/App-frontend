import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function ConfigPass() {
  const { verificationCode } = useParams()
  console.log('CODIGO DE VERIFICAÇÃO', verificationCode)

  const { configPass } = useAuth()

  useEffect(() => {
    if (verificationCode) {
      configPass(verificationCode).then(() => {})
    }
  })

  return <div></div>
}
