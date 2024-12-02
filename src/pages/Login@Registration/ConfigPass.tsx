import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {api} from "@/services//api/api"
import Cookies from "js-cookie"
import { useParams } from "react-router-dom"


export default function ConfigPass() {
  const {verificationCode} = useParams()
  console.log("CODIGO DE VERIFICAÇÃO", verificationCode)
  console.log("sdahuhdiuasgyduasguydgasgdyuasgduygayusdguyasgdyuasguydgaseguasgdugasjdg")
  const navigate = useNavigate()
  useEffect(() => {
     api
    .get (`auth/reset-password/${verificationCode}`)
    .then((response) => {
      console.log(response)
      const accessToken = response.data.access
      Cookies.set('accessToken', response.data.access, {sameSite: 'Lax', secure: true} )
      Cookies.set('refreshToken', response.data.refresh, {sameSite: 'Lax', secure: true})
      api.defaults.headers['Authorization'] = `Bearer ${accessToken}`
      navigate('/change-password')
    })

  }
)
  return (
    <div>

    </div>
  )
}
