import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import UserCourses from '@/components/profile/UserCourses'
import UserProfile from '@/components/profile/UserProfile'
import UserStatistics from '@/components/profile/UserStatistics'
import Button from '@/components/utility/Button'

export default function ProfileScreen() {
  return (
    <div className="bg-grid-pattern">
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
