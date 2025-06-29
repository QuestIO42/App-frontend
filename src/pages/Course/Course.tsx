import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Ranking from '@/components/home/Ranking';
import ProgressXpBar from '@/components/utility/ProgressXpBar';
import Voltar from '@/components/course/Voltar';
import Button from '@/components/utility/Button';
import CircuitCourse from '@/components/svgComponents/circuit/CircuitCourse';
import ExercisesGroup from '@/components/course/ExercisesGroup';
import RankingItem from '@/components/home/RankingItem';
import Forum from '@/components/course/Forum';
import { mockUsers } from '@/utils/mocks/mockUsers';
import { fetchAllQuizes } from '@/services/api/quiz';
import { fetchCourse } from '@/services/api/course';
import { Quiz } from '@/interfaces/Quiz';
import { Course as CourseData } from '@/interfaces/Course';
import { useAuth } from '@/hooks/useAuth';
import { getUsersInCourse } from '@/services/api/user';
import { User } from '@/interfaces/User';

export default function Course() {
  const [Quizes, setQuizes] = useState<Quiz[]>([]);
  const [Course, setCourse] = useState<CourseData | null>(null);
  const [courseTeacher, setCourseTeacher] = useState<User | null>(null);
  const [isCourseLoading, setIsCourseLoading] = useState(true); // Loading state
  const { courseId } = useParams();
  const { user, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    async function fetchQuizes() {
      try {
        if (courseId) {
          const [quizesResponse, courseInfoResponse, teachersResponse] = await Promise.all([
            fetchAllQuizes(courseId),
            fetchCourse(courseId),
            getUsersInCourse(courseId, 2) // Busca usuários com role 2 (professor)
          ]);

          setQuizes(quizesResponse);
          setCourse(courseInfoResponse.data);

          if (teachersResponse && teachersResponse.length > 0) {
            setCourseTeacher(teachersResponse[0]);
          }
        }
      } catch (error) {
        console.error(error);
        setCourseTeacher(null);
      } finally {
        setIsCourseLoading(false); // Set loading to false after fetch
      }
    }
    fetchQuizes();
  }, [courseId]);

  const isUserTheCourseTeacher = !isCourseLoading && user && courseTeacher && String(user.id) === String(courseTeacher.id);

  if (isCourseLoading || isAuthLoading) {
    // Show a loading spinner or placeholder while fetching
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const handleImportSuccess = (res: any) => {
    alert('Usuários importados com sucesso!');
    console.log(res.data);
  };

  const handleImportError = (err: any) => {
    alert('Falha ao importar.');
    console.error(err);
  };

  return (
    <div className="w-full overflow-x-hidden gap-6 bg-grid-pattern">
      <Header/>

      <div className="flex mt-11 justify-between items-center w-full">
        <div className="w-[25%] h-full flex flex-col justify-end gap-6">
          <div className="ml-10 md:ml-20">
            <Voltar/>
          </div>

          <div className="">
            <CircuitCourse/>
          </div>
        </div>

        {Course && (
          <div className="flex flex-col justify-center">
            <h2 className="mb-8 mt-10 text-6xl font-bold text-cinza">
              {Course.name}
            </h2>

            <ProgressXpBar text="seu progresso" value={75} />
          </div>
        )}

        <div className="w-[25%] font-size-1 h-20 flex justify-end">
          {isUserTheCourseTeacher && (
            <>
              <Button
                upload
                // Rota
                uploadUrl="/user"
                fieldName="file"
                courseId={courseId!}
                onUploadSuccess={handleImportSuccess}
                onUploadError={handleImportError}
                variant='secondary'
                className="mr-10 bg-white text-xl"
                text="importar alunos"
                size="small"
              ></Button>
              <Button
                courseId={courseId!}
                variant='quaternary'
                className="mr-[90px] text-cinza bg-white text-xl"
                text="exportar notas"
                size="small"
              ></Button>
            </>
          )}
        </div>
      </div>

      <div className="flex items-start justify-between my-6">
        <div className="mb-4 ml-10 md:ml-20 flex min-w-[500px] flex-col gap-10">
          <ExercisesGroup
            itens={Quizes}
          />
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
