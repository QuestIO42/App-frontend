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
import { fetchCourse } from '@/services/api/course';
import { getCourseCategories } from '@/services/api/category';
import { Quiz } from '@/interfaces/Quiz';
import { Course as CourseData } from '@/interfaces/Course';
import { Category } from '@/interfaces/Category';

export default function Course() {
  const [Quizes, setQuizes] = useState<Quiz[]>([]);
  const [Course, setCourse] = useState<CourseData | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const { courseId } = useParams();

  useEffect(() => {
    async function fetchQuizes() {
      try {
        if (courseId) {
          const quizes = await fetchAllQuizes(courseId);
          const courseInfo = await fetchCourse(courseId);
          // const courseCategories = await getCourseCategories(courseId);

          console.log('quiz', quizes);
          console.log('course', courseInfo);
          // console.log('categories', courseCategories);

          setQuizes(quizes);
          setCourse(courseInfo.data);
          // setCategories(courseCategories.data);
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

  const handleImportSuccess = (res: any) => {
    alert('Usuários importados com sucesso!');
    console.log(res.data);
  };

  const handleImportError = (err: any) => {
    alert('Falha ao importar.');
    console.error(err);
  };

  return (
    <div className="grid w-full overflow-x-hidden gap-6 bg-grid-pattern">
      <Header/>

      <div className="flex justify-between items-center w-full">
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

        <div className="w-[25%] font-size-1 mt-10 mr-4 h-20 w-16 flex justify-end">
          <Button
            upload
            // Rota
            uploadUrl="/user"
            fieldName="file"
            courseId={courseId!}
            onUploadSuccess={handleImportSuccess}
            onUploadError={handleImportError}
            variant='secondary'
            className="mr-[90px] bg-white text-xl"
            text="importar alunos"
            size="small"
          ></Button>
        </div>
      </div>

      <div className="flex items-start justify-between mt-4">
        <div className="mb-4 ml-10 md:ml-20 flex min-w-[500px] flex-col gap-10">
          <ExercisesGroup
            title="Portas Lógicas"
            Icon={LampIcon}
            itens={Quizes}
          />

          {/* {categories.map((category) => (
            <ExercisesGroup
              key={category.id}
              title={category.name}
              Icon={LampIcon}
              itens={Quizes}
            />
          ))} */}
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