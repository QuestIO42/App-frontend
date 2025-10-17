import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import Logo from '../svgComponents/Logo'
import NotificationIcon from '../svgComponents/icons/NotificationIcon'
import ProfileIcon from '../svgComponents/icons/ProfileIcon'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="col-span-full flex py-3 md:py-5 w-full items-center justify-between bg-roxo-900 px-8 md:px-16">
      <div className="flex items-center">
        <Logo link={'/home'} className="w-9 md:w-11 text-verde-300 transition-all duration-300 ease-in-out hover:text-[#2eb875] active:text-[#2eb875]" />
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <NotificationIcon className="w-9 md:w-10 aspect-square" />

        <Link to={`/profile/${user?.id}`} className="group">
          <ProfileIcon className="w-9 md:w-10 aspect-square" />
        </Link>
      </div>
    </header>
  )
}
