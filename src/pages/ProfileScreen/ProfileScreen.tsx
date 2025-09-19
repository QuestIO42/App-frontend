import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import UserCourses from '@/components/profile/UserCourses'
import UserProfile from '@/components/profile/UserProfile'
import UserStatistics from '@/components/profile/UserStatistics'
import { Course } from '@/interfaces/Course'
import { fetchAllUserCourses } from '@/services/api/course'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProfileScreen() {

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

  return (
    <div className="bg-grid-pattern overflow-x-hidden">
      <Header/>

      <main className="flex flex-col items-center justify-center gap-12 py-16 px-10 md:px-20">
        <div className="w-full flex flex-row flex-wrap items-stretch justify-center gap-12">
          <UserProfile/>
          <UserStatistics/>
        </div>

        <div className="w-full mt-12">
          <UserCourses courses={userCourses}></UserCourses>
        </div>
      </main>

      <Footer/>
    </div>
  )
}
