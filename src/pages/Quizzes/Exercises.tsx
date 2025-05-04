import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Ranking from '@/components/home/Ranking'
import Voltar from '@/components/course/Voltar'
import CircuitCourse from '@/components/svgComponents/circuit/CircuitCourse'
import RankingItem from '@/components/home/RankingItem'
import Forum from '@/components/course/Forum'
import { mockUsers } from '@/utils/mocks/mockUsers'
import { api } from '@/services/api/api'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function Exercises() {
  const lista_exercicios = ['Exercícios 1.0', 'Exercícios 1.1']

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
    <div className="grid min-h-screen w-full overflow-x-hidden grid-cols-4 grid-rows-[auto,1fr,auto] gap-6 bg-grid-pattern">
      <Header />

      <div className="col-span-full flex justify-between">
        <div className="w-30 flex flex-col justify-start">
          <div className="w-30 ml-6">
            <Voltar/>
          </div>

          <div className="w-8">
            <CircuitCourse/>
          </div>
        </div>

        <div className="absolute left-1/2 flex -translate-x-1/2 transform flex-col justify-center">
          <h2 className="mb-8 mt-10 text-6xl font-bold text-cinza">
            Lista de Exercícios
          </h2>
        </div>
      </div>

      <div className="relative col-span-full row-auto flex items-start justify-between">
        <div className="mb-4 ml-8 ml-[90px] flex min-w-[500px] flex-col gap-10">

        </div>

        <div className="mr-4 flex flex-col">
          <Ranking>
            <RankingItem users={mockUsers.users}/>
          </Ranking>

          <Forum/>
        </div>
      </div>

      <Footer/>
    </div>
  )
}
