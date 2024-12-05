import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "@/context/AuthProvider"


export default function ConfigPass() {
  const {verificationCode} = useParams()
  console.log("CODIGO DE VERIFICAÇÃO", verificationCode)

  const {configPass} = useAuth();

  useEffect(() => {
    if (verificationCode) {
      configPass(verificationCode).then(() => {
      })
    }
  })



  return (
    <div>

    </div>
  )

}
