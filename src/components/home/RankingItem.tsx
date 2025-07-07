import { RankingUser } from '@/services/api/ranking'; 
import ProfileIcon from '@/components/svgComponents/icons/ProfileIcon'

// A única interface necessária é a que define as props do componente
interface UserListProps {
  users: RankingUser[];
}

export default function RankingItem({ users }: UserListProps) {
  return (
    <>
      {users.slice(0, 10).map((user, index) => (
        <div key={`${user.full_name}-${index}`} className="flex items-center gap-5 pl-2 py-2">
          <div className="flex w-[25px] items-center justify-center font-bold text-gray-800 text-xl">
            {index + 1}º
          </div>

          <div className="flex-shrink-0 text-verde-300 text-3xl">
            <ProfileIcon />
          </div>

          <div className="flex flex-1 flex-col items-start">
            <div className="font-bold text-gray-800">{user.full_name}</div>
            <div className="-mt-1 text-sm font-semibold text-roxo-300">{user.total_xp} XP</div>
          </div>
        </div>
      ))}
    </>
    /* Falta adicionar a posição do usuário logado */
  );
}