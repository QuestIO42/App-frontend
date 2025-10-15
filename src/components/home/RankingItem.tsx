import { RankingUser } from '@/services/api/ranking';
import ProfileIcon from '@/components/svgComponents/icons/ProfileIcon'

interface UserListProps {
  users: RankingUser[];
}

export default function RankingItem({ users }: UserListProps) {
  return (
    <>
      {users.slice(0, 10).map((user, index) => (
        <div key={`${user.full_name}-${index}`} className="flex flex-row justify-center items-center min-h-[80px] gap-6 p-2">
          <div className="flex items-center justify-center font-bold text-roxo-300 leading-[1] h-[48px] aspect-square text-[20px] border border-roxo-300 bg-[#f8f7fc]">
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* <div className="flex items-center justify-center flex-shrink-0 text-verde-300 text-3xl">
            <ProfileIcon className="w-12 aspect-square" />
          </div> */}

          <div className="flex flex-1 flex-col items-start">
            <div className="font-semibold text-roxo-900 text-[14px]">{user.full_name}</div>
            <div className="mt-1 text-sm font-semibold text-roxo-500">{user.total_xp} XP</div>
          </div>
        </div>
      ))}
    </>
    /* Falta adicionar a posição do usuário logado */
  );
}
