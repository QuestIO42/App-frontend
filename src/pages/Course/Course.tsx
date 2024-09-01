import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import CoursesTemplate from '@/components/home/CoursesTemplate'
import Ranking from '@/components/home/Ranking'
import ProgressXpBar from '@/components/utility/ProgressXpBar'
import Voltar from '@/components/course/Voltar'
import Button from '@/components/utility/Button'
import CircuitCourse from '@/components/svgComponents/circuit/CircuitCourse'
import CourseIcon from '@/components/svgComponents/icons/CourseIcon'
import LabIcon from '@/components/svgComponents/icons/LabIcon'
import RankingItem from '@/components/home/RankingItem'
import {mockUsers} from '@/utils/mocks/mockUsers'
import { useAuth } from '@/context/AuthProvider'
import { api } from '@/services/api/api'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'


export default function Course() {
    const { user } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      try {
        const { sub } = jwtDecode(token) as { sub: string }
        const id = Number(sub)
        api
          .get(`/user/${id}`)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.error('Erro ao obter usuário:', error)
          })
      } catch (error) {
        console.error('Token inválido:', error)
      }
    }
  }, [])
  return (
    <div className="grid min-h-screen w-screen grid-cols-4 grid-rows-[auto,1fr,auto] gap-6 bg-grid-pattern">
      <Header />
      <div className="flex justify-between col-span-full">
        <div className="flex flex-col w-30 justify-start ">
            <div className="ml-6 w-30"><Voltar></Voltar></div>
            <div className="w-8"><CircuitCourse/></div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl mb-8 mt-10  font-bold">Portas Lógicas</h2>
          <ProgressXpBar text="seu progresso" value={75}></ProgressXpBar>
        </div>
        <div className="flex h-20 w-16 mr-10 mt-10 font-size-1 justify-end">
          <Button text="práticas Verilog" size="small"></Button></div>
      </div>


      <div className="relative col-span-full flex-col flex items-end mr-4 justify-around">

        <Ranking>
          <RankingItem users={mockUsers.users}/>
        </Ranking>
        <div className=" min-h-[271px] max-w-[23em] min-w-[300px] mt-10 min-w-[23.2rem] items-center justify-center bg-laranja shadow-default-laranja">
        <p className="mr-2 text-center items-center mt-6 text-3xl font-bold text-gray-800">
          fórum
        </p>
        <br />
        <hr className="border-t-2 border-gray-700 mx-8 mb-4" />
        <p className="text-center flex flex-col px-7 text-2xl font-bold text-gray-800">
          Dúvidas? Acrescente um novo tópico de discussão ao fórum!
        </p>
        <div className="flex  justify-center">
        <Button variant='tertiary' text="entrar" size="small"></Button>
        </div>
      </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

