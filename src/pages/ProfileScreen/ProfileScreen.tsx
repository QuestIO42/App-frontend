import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import UserCourses from '@/components/profile/UserCourses'
import UserProfile from '@/components/profile/UserProfile'
import UserStatistics from '@/components/profile/UserStatistics'
import Button from '@/components/utility/Button'
import { useAuth } from '@/hooks/useAuth'
import { Course } from '@/interfaces/Course'
import { fetchAllUserCourses } from '@/services/api/course'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProfileScreen() {
  const { signOut } = useAuth()
  const { userId } = useParams<{ userId: string }>()
  const [userCourses, setUserCourses] = useState<Course[]>([])

  useEffect(() => {
    const fetchUserCourses = async () => {
      if (userId) {
        try {
          console.log('useEffect chamado')
          const userCourses = await fetchAllUserCourses(userId)
          setUserCourses(userCourses)
          console.log('Cursos do usuário:', userCourses)
        } catch (error) {
          console.error('Erro ao obter cursos do usuário:', error)
        }
      }
    }

    fetchUserCourses()
  }, [])

  const handleClick = async () => {
    try {
      signOut()
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <div className="w-full overflow-x-hidden bg-grid-pattern">
      <Header/>

      <main className="flex flex-col items-center justify-center gap-20 md:mb-28 md:mt-16">
        <div className="relative flex items-center justify-center gap-24">
          <UserProfile/>
          <UserStatistics/>

          <Button
            className="absolute -right-40 top-0"
            text="logout"
            size="small"
            variant="quaternary"
            onClick={handleClick}
          ></Button>
        </div>
        <div className="w-[90%]">
          <UserCourses courses={userCourses}></UserCourses>
        </div>
      </main>

      <Footer/>
    </div>
  )
}
