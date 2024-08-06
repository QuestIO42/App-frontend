import { ElementType } from 'react'
interface UserCardProps {
  name: string
  profilePicture: ElementType
  college: string
  rating: number
}

interface UserListProps {
  users: UserCardProps[]
}
//Sorteio realizado por XP total?
export default function UserCard({users}: UserListProps) {
  return (
<>
{users.map((user) => (
        <div key={user.name} className="flex items-center gap-4">
          <div className="flex items-center font-bold text-gray-800 text-2xl">
            {user.rating}º
          </div>
          <user.profilePicture className="fill-current mt-2 flex-shrink-0" />
          <div className="flex flex-col items-start gap-1">
            <div className=" mt-1 font-bold text-xl text-gray-800">{user.name}</div>
            <div className="text-sm text-gray-800">{user.college}</div>
          </div>
        </div>
      ))}

</>
)
}
