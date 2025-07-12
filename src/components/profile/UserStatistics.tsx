import { useEffect, useState } from 'react';
import ProgressXpBar from '../utility/ProgressXpBar'
import ProgressXpCircle from '../utility/ProgressXpCircle'
import UserRank from './UserRank'
import { fetchUserRanking } from '@/services/api/ranking';

const XP_PER_LEVEL = 1000;
const calculateLevel = (totalXp: number): number => Math.floor(totalXp / XP_PER_LEVEL) + 1;
const calculateProgress = (totalXp: number): number => (totalXp % XP_PER_LEVEL) / XP_PER_LEVEL * 100;

/* interface UserStatisticsProps {
  username?: string
} */

export default function UserStatistics() {
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
      const loadData = async () => {
        const data = await fetchUserRanking();
        if (data) {
          const xp = data.user_ranking.total_xp;
          const pos = data.position;
  
          setTotalXp(xp);
          setLevel(calculateLevel(xp));
          setProgress(calculateProgress(xp));
          setPosition(pos);
        }
      };
      loadData();
    }, []);

  return (
    <aside className="flex h-auto flex-col items-center justify-center border-4 border-preto-default bg-branco p-4 shadow-default-preto md:min-w-[25rem] gap-3">
      <h2 className="center text-4xl font-bold text-cinza">estatísticas</h2>

      <div className="flex  w-2/3 mt-4 flex-col justify-center gap-3">
        <ProgressXpCircle level={level} progress={progress}></ProgressXpCircle>
        <ProgressXpBar text="xp" value={totalXp} progress={progress} maxValue={level * XP_PER_LEVEL}></ProgressXpBar>
        <UserRank position={position}></UserRank>
      </div>
    </aside>
  )
}
