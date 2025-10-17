import { useEffect, useState } from 'react';
import { fetchUserRanking } from '@/services/api/ranking';
import ProgressXpBar from '../utility/ProgressXpBar'
import ProgressXpCircle from '../utility/ProgressXpCircle'
import UserRank from './UserRank'

const XP_PER_LEVEL = 1000;
const calculateLevel = (totalXp: number): number => Math.floor(totalXp / XP_PER_LEVEL) + 1;
const calculateProgress = (totalXp: number): number => (totalXp % XP_PER_LEVEL) / XP_PER_LEVEL * 100;

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
    <div className="flex-1 flex h-auto flex-col items-center justify-center border-2 bg-cinza-300 shadow-default-cinza-300 p-8 md:min-w-[25rem] gap-3">
      <h2 className="w-full text-center text-2xl font-bold text-laranja tracking-wider uppercase p-5 border border-laranja bg-[#f8e0c9]/60">estatísticas</h2>

      <div className="flex flex-col w-full mt-6 justify-center gap-3">
        <div className="flex items-center justify-center">
          <ProgressXpCircle width={"10em"} height={"10em"} level={level} progress={progress}/>
        </div>
        <ProgressXpBar text="xp" value={totalXp} progress={progress} maxValue={level * XP_PER_LEVEL} />
        <UserRank position={position}></UserRank>
      </div>
    </div>
  )
}
