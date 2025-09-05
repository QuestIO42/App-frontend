import { useState, useEffect } from 'react';
import { fetchUserRanking } from '@/services/api/ranking';
import { useAuth } from '@/hooks/useAuth';
import ProgressXpCircle from '../utility/ProgressXpCircle';

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
    <div className="flex flex-row flex-wrap border-4 p-8 gap-8 border-preto-default bg-branco shadow-default-preto">
      <div className="hidden items-center justify-center sm:flex">
        <ProgressXpCircle level={level} progress={progress} />
      </div>

      <div className="flex flex-col items-start justify-center gap-1">
        <h2 className="text-4xl font-bold text-black uppercase">olá, {user?.username}!</h2>
        <h3 className='text-lg text-gray-400'>{user?.email}</h3>
      </div>
    </div>
  );
}
