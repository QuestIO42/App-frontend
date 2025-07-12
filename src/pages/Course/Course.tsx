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
import { fetchAllQuizes, fetchUserQuizProgress } from '@/services/api/quiz';
import { fetchCourse, exportCourseGrades } from '@/services/api/course';
import { Quiz } from '@/interfaces/Quiz';
import { Course as CourseData } from '@/interfaces/Course';
import { useAuth } from '@/hooks/useAuth';
import { fetchUserRoleInCourse } from '@/services/api/user';
import { fetchRankingData, RankingUser } from '@/services/api/ranking';

export default function Course() {
  const [Quizes, setQuizes] = useState<Quiz[]>([]);
  const [Course, setCourse] = useState<CourseData | null>(null);
  const [userCourseRole, setUserCourseRole] = useState<number | null>(null);
  const [isCourseLoading, setIsCourseLoading] = useState(true); // Loading state
  const { courseId } = useParams();
  const { user, isLoading: isAuthLoading } = useAuth();
  const [isExporting, setIsExporting] = useState(false);
  const [rankingUsers, setRankingUsers] = useState<RankingUser[]>([]);
  const [isRankingLoading, setIsRankingLoading] = useState<boolean>(true);
  
  const [quizProgress, setQuizProgress] = useState({
    userScore: 0,
    maxScore: 0,
    percentage: 0,
  });

  useEffect(() => {
    async function fetchData() {
      if (courseId && user?.id) {
        try {
          const [quizesResponse, courseInfoResponse, userCourseData] = await Promise.all([
            fetchAllQuizes(courseId),
            fetchCourse(courseId),
            fetchUserRoleInCourse(user.id.toString(), courseId)
          ]);

          setQuizes(quizesResponse);
          setCourse(courseInfoResponse.data);
          setUserCourseRole(userCourseData.role);

          if (quizesResponse.length > 0) {
            const progressPromises = quizesResponse.map((quiz: { id: string; }) =>
              fetchUserQuizProgress(quiz.id, user.id.toString())
            );
            const progresses = await Promise.all(progressPromises);

            let totalUserScore = 0;
            let totalQuizMaxScore = 0;

            progresses.forEach(p => {
              totalUserScore += p.user_max_score || 0;
              totalQuizMaxScore += p.quiz_max_score || 0;
            });

            const percentage = totalQuizMaxScore > 0
              ? (totalUserScore / totalQuizMaxScore) * 100
              : 0;

            setQuizProgress({
              userScore: totalUserScore,
              maxScore: totalQuizMaxScore,
              percentage: percentage,
            });
          }
        } catch (error) {
          console.error("Failed to fetch course data:", error);
          setUserCourseRole(null);
        } finally {
          setIsCourseLoading(false);
        }
      } else if (!isAuthLoading) {
        setIsCourseLoading(false);
      }
    }

    const loadRanking = async () => {
      setIsRankingLoading(true);
      const users = await fetchRankingData(10);

      const filteredUsers = users.filter(user => user.total_xp > 0);

      setRankingUsers(filteredUsers);
      setIsRankingLoading(false);
    };

        loadRanking();
    fetchData();
  }, [courseId, user, isAuthLoading]);

  const isUserTheCourseTeacher = userCourseRole === 2;

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

  const handleExportGrades = async () => {
    if (!courseId || isExporting) return;

    setIsExporting(true);

    try {
      const response = await exportCourseGrades(courseId);
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : 'notas_do_curso.csv';

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);

      link.click();

      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      window.URL.revokeObjectURL(url);

    } catch (error) {
      alert('Falha ao exportar as notas. Verifique se você tem permissão e tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full overflow-x-hidden gap-6 bg-grid-pattern">
      <Header/>

      <div className="flex flex-col mt-12 justify-between items-center w-full">
        <div className="relative w-full flex flex-col justify-end gap-6">
          <div className="ml-10 md:ml-20">
            <Voltar/>
          </div>

          <div className="absolute -bottom-44 left-0 w-full">
            <CircuitCourse />
          </div>
        </div>

        {Course && (
          <div className="flex flex-col justify-center mx-10">
            <h2 className="mb-8 mt-10 text-5xl text-center font-bold text-cinza">
              {Course.name}
            </h2>

            <ProgressXpBar
              text="seu progresso"
              progress={quizProgress.percentage}
              value={quizProgress.userScore}
              maxValue={quizProgress.maxScore}
            />
          </div>
        )}

        <div className="w-[25%] my-12 flex justify-end">
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
                onClick={handleExportGrades}
                disabled={isExporting}
                courseId={courseId!}
                variant='quaternary'
                className="mr-[90px] text-cinza bg-white text-xl"
                text={isExporting ? "Exportando..." : "exportar notas"}
                size="small"
              ></Button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-12 ml-10 md:ml-20 mt-4 mb-12">
        <div className="flex flex-col min-w-[500px] mb-4">
          <div className="flex w-fit min-h-[72px] py-4 px-8 items-center justify-start bg-roxo-300 shadow-default-roxo-500">
            <p className="text-center text-2xl font-bold text-[#bab1fc]">
              Questionários
            </p>
          </div>

          <ExercisesGroup
            itens={Quizes}
          />
        </div>

        <div className="mr-4 flex flex-col">
          <Ranking>
            {isRankingLoading ? (
              <p>Carregando ranking...</p>
            ) : (
              <RankingItem users={rankingUsers} />
            )}
          </Ranking>

          <Forum />
        </div>
      </div>

      <Footer />
    </div>
  );
}
