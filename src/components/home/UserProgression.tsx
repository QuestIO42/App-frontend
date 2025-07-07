import { useState, useEffect } from 'react';
import ProgressXpBar from '../utility/ProgressXpBar';
import ProgressXpCircle from '../utility/ProgressXpCircle';
import { fetchUserRanking } from '@/services/api/ranking';
import { useAuth } from '@/hooks/useAuth';

const XP_PER_LEVEL = 1000;
const calculateLevel = (totalXp: number): number => Math.floor(totalXp / XP_PER_LEVEL) + 1;
const calculateProgress = (totalXp: number): number => (totalXp % XP_PER_LEVEL) / XP_PER_LEVEL * 100;

export default function UserProgression() {
  const { user } = useAuth();
  
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [totalXp, setTotalXp] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchUserRanking();
      if (data) {
        const xp = data.user_ranking.total_xp;

        setTotalXp(xp);
        setLevel(calculateLevel(xp));
        setProgress(calculateProgress(xp));
      }
    };
    loadData();
  }, []);

  return (
    <div className="grid min-h-[193px] min-w-[558px] grid-cols-2 border-4 border-preto-default bg-branco pt-4 pb-3 pl-12 pr-0 shadow-default-preto">
      <div className="flex flex-col">
        <h2 className="center text-4xl font-bold text-cinza pt-2">olá, {user?.username}!</h2>
        <ProgressXpBar text="xp" value={totalXp} />
      </div>
      <div className="ml-auto flex items-center justify-center">
        <ProgressXpCircle level={level} progress={progress} />
      </div>
    </div>
  );
}