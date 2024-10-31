import Button from '../utility/Button'
import ProfileIcon from '../svgComponents/icons/ProfileIcon'
import StudentInformation from './StudentInformation'
import { useAuth } from '@/context/AuthProvider'

export default function UserProfile() {
  const { user } = useAuth()
  return (
    <section className="relative flex flex-col items-center justify-center gap-4 lg:max-w-[27rem]">
      <Button
        className="absolute right-0 top-0"
        text="editar"
        size="small"
        variant="secondary"
      ></Button>
      <ProfileIcon className="mt-10 h-[160px] w-[160px] text-verde-300"></ProfileIcon>
      <h2 className="text-5xl font-bold text-cinza">{user?.username}</h2>
      <StudentInformation />
      <Button className="text-cinza" text={'minhas turmas'}></Button>
    </section>
  )
}
