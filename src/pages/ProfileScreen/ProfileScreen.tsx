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
          const userCourses = await fetchAllUserCourses(userId)
          setUserCourses(userCourses)
        } catch (error) {
          setUserCourses([])
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
    <div className="bg-grid-pattern">
      <Header/>

      <main className="flex flex-col items-center justify-center gap-12 py-20 px-10 md:px-20">
        <div className="flex flex-row items-start justify-center gap-12">
          <UserProfile/>
          <UserStatistics/>

          <Button
            text="logout"
            size="small"
            variant="quaternary"
            onClick={handleClick}
          ></Button>
        </div>

        <div className="w-full">
          <UserCourses courses={userCourses}></UserCourses>
        </div>
      </main>

      <Footer/>
    </div>
  )
}
