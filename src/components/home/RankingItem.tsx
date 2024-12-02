import { ElementType } from 'react'
import ProfileIcon from '../svgComponents/icons/ProfileIcon'
import { useAuth } from '@/context/AuthProvider'

interface RankingItemProps {
  name: string
  profilePicture?: ElementType
  college: string
  rating: number
}

interface UserListProps {
  users: RankingItemProps[]
}

export default function RankingItem({ users }: UserListProps) {
  const { user } = useAuth();

  return (
    <>
      {users.slice(0, 10).map((user) => (
        <div key={user.name} className="flex items-center gap-5 pl-2 mt-1 mb-1">
          <div className="flex gap-20 w-[25px] items-center font-bold text-gray-800 text-xl">
            {user.rating}º
          </div>
          <div className="mt-2 flex-shrink-0 text-verde-300">
            {user.profilePicture ? <user.profilePicture /> : <ProfileIcon />}
          </div>
          <div className="flex flex-col items-start ">
            <div className="font-bold text-gray-800">{user.name}</div>
            <div className="-mt-1 text-sm text-gray-800">{user.college}</div>
          </div>
        </div>
      ))}
      <hr className="border-t-1 border-cinza mx-6 my-2"/>
      <div key={user?.username} className="flex items-center gap-5 pl-2 mb-1">
          <div className="flex gap-20 w-[25px] items-center font-bold text-gray-800 text-xl">
            {11}º
          </div>
          <div className="mt-2 flex-shrink-0 text-verde-300">
            {user?.profilePicture ? <user.profilePicture /> : <ProfileIcon />}
          </div>
          <div className="flex flex-col items-start ">
            <div className="font-bold text-gray-800">{user?.username}</div>
            <div className="-mt-1 text-sm text-gray-800">{"UFSCAR"}</div>
          </div>
        </div>
    </>
    /* Falta adicionar algumas informações ao usuário */
  )
}
