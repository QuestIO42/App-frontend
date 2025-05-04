import { Link } from 'react-router-dom'
import Logo from '../svgComponents/Logo'
import NotificationIcon from '../svgComponents/icons/NotificationIcon'

import ProfileIcon from '../svgComponents/icons/ProfileIcon'
// import SearchBar from './SearchBar'
import { useAuth } from '@/hooks/useAuth'

export default function Header() {
  const { user } = useAuth()
  return (
    <header className="col-span-full flex h-24 w-full items-center justify-between bg-roxo-900 px-10 md:px-20">
      <div className="flex flex-1 items-center">
        <Logo
          className="text-verde-300 transition-all duration-300 ease-in-out hover:text-verde-900 active:scale-90 active:text-verde-300"
          link={'/home'}
        ></Logo>
      </div>

      {/* <div className="flex flex-1 items-center justify-center">
        <SearchBar></SearchBar>
      </div> */}

      <div className="flex flex-1 items-center justify-end gap-6">
        <Link to={`/profile/${user?.id}`} className="group">
          <ProfileIcon className="text-verde-300 transition-all duration-300 ease-in-out hover:text-verde-900 active:scale-90 active:text-verde-300"></ProfileIcon>
        </Link>

        <NotificationIcon/>
      </div>
    </header>
  )
}
