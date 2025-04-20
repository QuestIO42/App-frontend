import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Ranking from '@/components/home/Ranking';
import ProgressXpBar from '@/components/utility/ProgressXpBar';
import Voltar from '@/components/course/Voltar';
import Button from '@/components/utility/Button';
import CircuitCourse from '@/components/svgComponents/circuit/CircuitCourse';
import LampIcon from '@/components/svgComponents/icons/LampIcon';
import ExercisesGroup from '@/components/course/ExercisesGroup';
import RankingItem from '@/components/home/RankingItem';
import Forum from '@/components/course/Forum';
import { mockUsers } from '@/utils/mocks/mockUsers';
import { fetchAllQuizes } from '@/services/api/quiz';
import { Quiz } from '@/interfaces/Quiz';

export default function Course() {
  const [Quizes, setQuizes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const { courseId } = useParams();

  useEffect(() => {
    async function fetchQuizes() {
      try {
        if (courseId) {
          const quizes = await fetchAllQuizes(courseId);
          console.log('quiz', quizes);
          setQuizes(quizes);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set loading to false after fetch
      }
    }
    fetchQuizes();
  }, [courseId]);

  if (isLoading) {
    // Show a loading spinner or placeholder while fetching
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 bg-grid-pattern">
      <Header />
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col justify-start">
          <div className="w-30 ml-6">
            <Voltar />
          </div>
          <div className="w-8">
            <CircuitCourse />
          </div>
        </div>
        <div className="flex flex-col justify-center mx-auto">
          <h2 className="mb-8 mt-10 text-6xl font-bold text-cinza">
            Portas Lógicas
          </h2>
          <ProgressXpBar text="seu progresso" value={75} />
        </div>

        <div className="font-size-1 mt-10 mr-4 h-20 w-16 flex justify-end">
          {/* Ainda falta implementar a funcionalidade desse botão e garantir que ele só apareça para o professor */}
          <Button
            to=""
            variant='secondary'
            className="mr-[90px] bg-white text-xl"
            text="importar alunos"
            size="small"
          ></Button>
        </div>

      </div>

      <div className="flex items-start justify-between">
        <div className="mb-4 ml-[90px] flex min-w-[500px] flex-col gap-10">
          <ExercisesGroup
            title="Portas Lógicas"
            Icon={LampIcon}
            itens={Quizes}
          ></ExercisesGroup>
          <ExercisesGroup
            title="Circuitos Lógicos"
            Icon={LampIcon}
            itens={Quizes}
          ></ExercisesGroup>
        </div>
        <div className="mr-4 flex flex-col">
          <Ranking>
            <RankingItem users={mockUsers.users} />
          </Ranking>
          <Forum />
        </div>
      </div>
      <Footer />
    </div>
  );
}
