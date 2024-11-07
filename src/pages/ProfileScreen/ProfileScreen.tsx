import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import UserCourses from '@/components/profile/UserCourses'
import UserProfile from '@/components/profile/UserProfile'
import UserStatistics from '@/components/profile/UserStatistics'
import Button from '@/components/utility/Button'
import Cookies from 'js-cookie'
import {useState} from 'react'
import {logout} from '@/services/api/auth'
import { useAuth } from '@/context/AuthProvider'

export default function ProfileScreen() {

  const [accessToken, setToken] = useState<string | null>(() => {
    return Cookies.get('accessToken') || null
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(accessToken !== null){
      const response = logout({accessToken})
      console.log(response)
      setToken(null)
      Cookies.remove('accessToken')
      window.location.href = '/';
  };
  }

  return (
    <div className="bzg-grid-pattern">
      <Header></Header>
      <main className="flex flex-col items-center justify-center gap-20 md:mb-28 md:mt-16">
        <div className="relative flex items-center justify-center gap-24">
          <UserProfile></UserProfile>
          <UserStatistics></UserStatistics>

          <Button
            className='absolute -right-40 top-0'
            text="logout"
            size='small'
            variant='quaternary'
            onClick={handleClick}
          ></Button>

        </div>
        <div className="w-[90%]">
          <UserCourses></UserCourses>
        </div>
      </main>
      <Footer></Footer>
    </div>
  )
}
