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
import { useAuth } from '@/context/AuthProvider'
import { api } from '@/services/api/api'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'


export default function Home() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [token, setToken] = useState<string | null>(() => {
    return Cookies.get('accessToken') || null
  })
  useEffect(() => {
    if (import.meta.env.VITE_APP_ENV === 'development') {
      setToken(localStorage.getItem('accessToken'))
    }
    if (token) {
      try {
        const { sub } = jwtDecode(token) as { sub: string }
        const id = Number(sub)
        console.log(id)
        if(id){
        api
          .get(`/user/${id}`, {
          }
          )
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.error('Erro ao obter usuário:', error)
              })}
      } catch (error) {
        console.error('Token inválido:', error)
      }
    }
  }, [token])

  useEffect(() => {
    if(token){
      try{
      api
      .get('/course')
      .then((response) => {
        console.log(response.data)
        setCourses(response.data)
      })
      .catch((error) => {
        console.error('Erro ao obter cursos:', error)
    })
  }   catch (error) {
        console.error('Token inválido:', error)
  }
  }
}, [token])

useEffect(() => {
  console.log("Updated courses state:", courses[0]);
}, [courses]);

  return (
    <div className="grid min-h-screen w-screen grid-cols-4 grid-rows-[auto,1fr,auto] gap-24 bg-grid-pattern">
      <Header />
      <div className="col-span-full grid grid-cols-2">
        <div className="flex items-center justify-center">
          <UserProgression username={user?.username} />
        </div>
        <div className="flex items-center justify-end">
          <CircuitTopRight/>
        </div>
      </div>
      <div className="relative col-span-full row-auto flex items-start justify-around">
        <div className="flex flex-col items-center justify-center gap-20">
          <CoursesTemplate
            Icon={CourseIcon}
            title="Meus Cursos"
            IsRectangle= {false}
            Courses={courses}
          ></CoursesTemplate>
          {/*Falta alinhar a versão retangular com a margem da página*/}
          <CoursesTemplate
            Icon={LabIcon}
            title="Laboratórios virtuais"
            IsRectangle={true}
            Courses={courses}
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
