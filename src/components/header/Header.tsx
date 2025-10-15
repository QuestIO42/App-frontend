import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import Logo from '../svgComponents/Logo'
import NotificationIcon from '../svgComponents/icons/NotificationIcon'
import ProfileIcon from '../svgComponents/icons/ProfileIcon'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="col-span-full flex h-[100px] w-full items-center justify-between bg-roxo-900 px-8 md:px-16">
      <div className="flex items-center">
        <Logo link={'/home'} className="w-12 text-verde-300 transition-all duration-300 ease-in-out hover:text-[#2eb875] active:text-[#2eb875]" />
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        <NotificationIcon className="w-11 aspect-square" />

        <Link to={`/profile/${user?.id}`} className="group">
          <ProfileIcon className="w-11 aspect-square" />
        </Link>
      </div>
    </header>
  )
}
