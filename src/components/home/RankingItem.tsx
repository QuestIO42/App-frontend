import { ElementType } from 'react'
interface RankingItemProps {
  name: string
  profilePicture: ElementType
  college: string
  rating: number
}

interface UserListProps {
  users: RankingItemProps[]
}

export default function RankingItem({ users }: UserListProps) {
  return (
    <>
      {users.slice(0, 10).map((user) => (
        <div key={user.name + user.rating} className="flex items-center gap-5 pl-2">
          <div className="flex gap-20 w-[25px] items-center font-bold text-gray-800 text-xl">
            {user.rating}º
          </div>
          <div className="mt-2 flex-shrink-0 text-verde-300">
            <user.profilePicture />
          </div>
          <div className="flex flex-col items-start ">
            <div className="font-bold text-gray-800">{user.name}</div>
            <div className="-mt-1 text-sm text-gray-800">{user.college}</div>
          </div>
        </div>
      ))}
    </>
    /* Falta adicionar a posição do usuário logado */
  )
}
