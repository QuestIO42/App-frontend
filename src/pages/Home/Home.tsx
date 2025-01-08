import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import CoursesTemplate from '@/components/home/CoursesTemplate'
import Ranking from '@/components/home/Ranking'
import UserProgression from '@/components/home/UserProgression'
import CircuitHome from '@/components/svgComponents/circuit/CircuitHome'
import CircuitTopRight from '@/components/svgComponents/circuit/CircuitTopRight'
import CourseIcon from '@/components/svgComponents/icons/CourseIcon'
import LabIcon from '@/components/svgComponents/icons/LabIcon'
import RankingItem from '@/components/home/RankingItem'
import { mockUsers } from '@/utils/mocks/mockUsers'
import { useEffect, useState } from 'react'
import CodeSpace from '@/components/verilogIDE/CodeSpace'
import { useAuth } from '@/hooks/useAuth'
import { fetchAllCourses } from '@/services/api/course'


export default function Home() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    async function fetchCourses() {
      try {
        const courses = await fetchAllCourses()
        setCourses(courses)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCourses()
  }, [])

  return (
    <div className="grid min-h-screen w-screen grid-cols-4 grid-rows-[auto,1fr,auto] gap-24 bg-grid-pattern">
      <Header />
      <div className="col-span-full grid grid-cols-2">
        <div className="flex items-center justify-center">
          <UserProgression username={user?.username} xp_main={user?.xp_main} />
        </div>
        <div className="flex items-center justify-end">
          <CircuitTopRight />
        </div>
      </div>
      <div className="relative col-span-full row-auto flex items-start justify-around">
        <div className="flex flex-col items-center justify-center gap-20">
          <CoursesTemplate
            Icon={CourseIcon}
            title="Meus Cursos"
            IsRectangle={false}
            courses={courses}
          ></CoursesTemplate>
          {/*Falta alinhar a versão retangular com a margem da página*/}
          <CoursesTemplate
            Icon={LabIcon}
            title="Laboratórios virtuais"
            IsRectangle={true}
            courses={courses}
          ></CoursesTemplate>
        </div>

        <Ranking>
          <RankingItem users={mockUsers.users} />
        </Ranking>

        <CircuitHome className="absolute bottom-0 right-0"></CircuitHome>
      </div>
      <Footer></Footer>
    </div>
  )
}
