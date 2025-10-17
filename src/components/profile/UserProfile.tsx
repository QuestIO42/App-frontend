import ProfileIcon from '../svgComponents/icons/ProfileIcon'
import StudentInformation from './StudentInformation'
import Button from '@/components/utility/Button'
import { useAuth } from '@/hooks/useAuth'

export default function UserProfile() {
  const { signOut } = useAuth()
  const { user } = useAuth()

  const handleClick = async () => {
    try {
      signOut()
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <div className="flex-1 flex h-auto flex-col items-center justify-center border-2 bg-cinza-300 shadow-default-cinza-300 p-8 md:min-w-[25rem] gap-3">
      <h2 className="w-full text-center text-2xl font-bold text-[#47bf85] tracking-wider uppercase p-5 border border-[#47bf85] bg-[#f0fff8]">minha conta</h2>
      <ProfileIcon className="mt-8 h-[160px] w-[160px] text-verde-300"></ProfileIcon>
      <h2 className="text-4xl font-bold text-cinza-900">{user?.username}</h2>
      <StudentInformation />

      <Button
        text="Logout"
        size="small"
        onClick={handleClick}
        className="w-full p-2 mt-2 border-gray-300 bg-white text-gray-400 shadow-default-cinza-300 hover:bg-vermelho-300 hover:border-vermelho-300 hover:text-branco hover:shadow-default-vermelho-900"
      ></Button>
    </div>
  )
}
