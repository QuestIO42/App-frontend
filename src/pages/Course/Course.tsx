import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Ranking from '@/components/home/Ranking'
import ProgressXpBar from '@/components/utility/ProgressXpBar'
import Voltar from '@/components/course/Voltar'
import Button from '@/components/utility/Button'
import CircuitCourse from '@/components/svgComponents/circuit/CircuitCourse'
import LampIcon from '@/components/svgComponents/icons/LampIcon'
import ExercisesGroup from '@/components/course/ExercisesGroup'
import RankingItem from '@/components/home/RankingItem'
import Forum from '@/components/course/Forum'
import { mockUsers } from '@/utils/mocks/mockUsers'
import { api } from '@/services/api/api'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { fetchAllQuizes } from '@/services/api/quiz'
import { useParams } from 'react-router-dom'
import { Quiz } from '@/interfaces/Quiz'
export default function Course() {
  const [Quizes, setQuizes] =  useState<Quiz[]>([])
  const {courseId} = useParams()

  useEffect(() => {
    async function fetchQuizes() {
      try {
        if(courseId) {
        const quizes = await fetchAllQuizes(courseId)
        setQuizes(quizes)}
      } catch (error) {
        console.error(error)
      }
    }
    fetchQuizes()
  }, [])

  return (
    <div className="grid min-h-screen w-screen grid-cols-4 grid-rows-[auto,1fr,auto] gap-6 bg-grid-pattern">
      <Header />
      <div className="col-span-full flex justify-between">
        <div className="w-30 flex flex-col justify-start">
          <div className="w-30 ml-6">
            <Voltar></Voltar>
          </div>
          <div className="w-8">
            <CircuitCourse />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="mb-8 mt-10 text-6xl font-bold text-cinza">
            Portas Lógicas
          </h2>
          <ProgressXpBar text="seu progresso" value={75}></ProgressXpBar>
        </div>

        <div className="font-size-1 mr-5 mt-10 flex h-20 w-16 justify-end">
          <Button
            to="/exercises"
            className="mr-[90px] bg-white text-2xl"
            text="lista de exercícios"
            size="small"
          ></Button>
        </div>
      </div>

      <div className="relative col-span-full row-auto flex items-start justify-between">
        <div className="mb-4 ml-8 ml-[90px] flex min-w-[500px] flex-col gap-10">
          <ExercisesGroup
            title="Portas Lógicas"
            Icon={LampIcon}
            itens={Quizes}
          ></ExercisesGroup>
          <ExercisesGroup
            title="Circuitos Lógicos"
            Icon={LampIcon}
            itens={Quizes}
          ></ExercisesGroup>
        </div>
        <div className="mr-4 flex flex-col">
          <Ranking>
            <RankingItem users={mockUsers.users} />
          </Ranking>
          <Forum />
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}
