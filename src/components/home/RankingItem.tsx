import { RankingUser } from '@/services/api/ranking';
import ProfileIcon from '@/components/svgComponents/icons/ProfileIcon'

interface UserListProps {
  users: RankingUser[];
}

export default function RankingItem({ users }: UserListProps) {
  return (
    <>
      {users.slice(0, 10).map((user, index) => (
        <div key={`${user.full_name}-${index}`} className="flex items-stretch min-h-[80px] gap-5 px-2 py-2">
          <div className="flex items-center justify-center font-bold text-roxo-900 text-2xl">
            {String(index + 1).padStart(2, '0')}
          </div>

          <div className="flex items-center justify-center flex-shrink-0 text-verde-300 text-3xl">
            <ProfileIcon />
          </div>

          <div className="flex flex-1 flex-col items-start">
            <div className="font-bold text-gray-900">{user.full_name}</div>
            <div className="mt-1 text-sm font-semibold text-roxo-900">{user.total_xp} XP</div>
          </div>
        </div>
      ))}
    </>
    /* Falta adicionar a posição do usuário logado */
  );
}
