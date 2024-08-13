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
//Sorteio realizado por XP total?
export default function RankingItem({ users }: UserListProps) {
  return (
    <>
      {users.slice(0, 10).map((user) => (
        <div key={user.name} className="flex items-center gap-6">
          <div className="flex gap-20 w-[25px] items-center font-bold text-gray-800 text-2xl">
            {user.rating}º
          </div>
          <div className="mt-2 flex-shrink-0 text-verde-300">
            <user.profilePicture />
          </div>
          <div className="flex flex-col items-start ">
            <div className="font-bold text-xl text-gray-800">{user.name}</div>
            <div className="-mt-1 text-sm text-gray-800">{user.college}</div>
          </div>
        </div>
      ))}
    </>
  )
}
