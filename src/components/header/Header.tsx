import Logo from '../svgComponents/Logo'
import NotificationIcon from '../svgComponents/icons/NotificationIcon'

import ProfileIcon from '../svgComponents/icons/ProfileIcon'
import SearchBar from './SearchBar'

export default function Header() {
  return (
    <header className="col-span-full flex h-24 w-full items-center justify-between bg-roxo-escuro px-8">
      <div className="flex flex-1 items-center">
        <Logo className="text-verde-claro" link={'/home'}></Logo>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <SearchBar></SearchBar>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <ProfileIcon></ProfileIcon>
        <NotificationIcon></NotificationIcon>
      </div>
    </header>
  )
}
