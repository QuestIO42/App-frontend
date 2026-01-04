import { ReactNode, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Course } from '@/interfaces/Course'
import { Lab } from '@/interfaces/Lab'
import { User } from '@/interfaces/User'
import { getUsersInCourse } from '@/services/api/user'
import { importCourse } from '@/services/api/course';
import { useAuth } from '@/hooks/useAuth'
import { subscribeToCourse } from '@/services/api/course'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import Button from '../utility/Button'
import ModalSquareForm from '../utility/ModalSquareForm'

interface CourseWithSubscription extends Course {
  isSubscribed: boolean;
}

interface CoursesTemplateProps {
  title: string;
  Icon: ReactNode;
  IsRectangle: boolean;
  courses?: CourseWithSubscription[];
  labs?: Lab[];
  createButton?: string;
  onSubscriptionChange?: (courseId: string) => void;
}

export default function CoursesTemplate({
  title,
  Icon,
  IsRectangle,
  courses = [],
  labs = [],
  createButton = "",
  onSubscriptionChange = () => {},
}: CoursesTemplateProps) {
  const hasCourses = courses && courses.length > 0;
  const hasLabs = labs && labs.length > 0;
  const [teachers, setTeachers] = useState<Record<string, string>>({});
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const BASE_IMAGE_URL = "https://questio.vlab.dc.ufscar.br/";

  // Função que é chamada ao clicar em "Inscrever-se"
  const handleSubscribe = async (courseId: string) => {
    if (!user) return;
    try {
      await subscribeToCourse(courseId, user.id.toString());
      alert('Inscrição realizada com sucesso!');
      if (onSubscriptionChange) {
        onSubscriptionChange(courseId);
      }
    } catch (error) {
      console.error('Erro ao se inscrever:', error);
      alert('Falha ao se inscrever no curso.');
    }
  };

  // Busca os professores de cada curso
  useEffect(() => {
    async function fetchTeachers() {
      try {
        const teachersArray = await Promise.all(
          courses.map(async (course) => {
            try {
              const users: User[] = await getUsersInCourse(course.id, 2)
              return { courseId: course.id, teacherName: users[0].full_name}
            } catch (error) {
              return { courseId: course.id, teacherName: 'Nenhum professor associado a este curso' }
            }
          })
        )

        const courseTeachers: Record<string, string> = {}

        teachersArray.forEach(({ courseId, teacherName }) => {
          courseTeachers[courseId] = teacherName
        })

        setTeachers(courseTeachers)
      } catch (error) {
        console.error('Erro geral ao buscar professores:', error)
      }
    }

    if (courses.length > 0) {
      fetchTeachers()
    }
  }, [courses])

  const handleImportCourseClick = () => {
    fileInputRef.current?.click();
  };

  const handleCourseFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || isImporting) return;

    setIsImporting(true);

    try {
      await importCourse(file);
      alert('Curso importado com sucesso!');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Erro ao importar curso.');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-start gap-10">
      <div className="w-full flex flex-row flex-wrap gap-5 sm:gap-8">
        <div className="flex w-full sm:w-fit min-w-[250px] py-4 px-6 items-center justify-center text-[#555] bg-[#DDD] shadow-default-cinza gap-4">
          {Icon}
          <h2 className="text-lg sm:text-xl font-bold text-[#555]">{title}</h2>
        </div>

        {createButton && user?.role === 2 &&
          <button onClick={() => {navigate('/create/course')}} className="flex w-full sm:w-fit min-w-[200px] py-4 px-6 items-center justify-center bg-verde-300 shadow-default-verde-900 gap-4 transition-all duration-300 hover:scale-[1.03]">
            <FontAwesomeIcon icon={faPencil} className="text-[#2f6e4e] text-2xl" />
            <h2 className="text-lg sm:text-xl font-bold text-[#2f6e4e]">{createButton}</h2>
          </button>
        }

        {createButton && user?.role === 2 &&
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleCourseFileSelected}
              className="hidden"
            />

            <Button
              onClick={handleImportCourseClick}
              disabled={isImporting}
              variant='default'
              className="text-lg"
              text={isImporting ? "Importando..." : "Importar curso"}
              size="small"
            />
          </>
        }
      </div>

      <div className="ml-3 flex flex-wrap items-start justify-start gap-12">
        {hasCourses ? (
          courses.map((course) => {
            const imagePath = course.cover_image?.replace("/media/", "") || "";

            return (
            <div key={course.id} className="flex flex-col items-center">
              <div
                // O card só é clicável se o usuário estiver inscrito
                onClick={() => course.isSubscribed && navigate(`/Course/${course.id}`)}
                className={course.isSubscribed ? "cursor-pointer" : "cursor-default"}
              >
                <ModalSquareForm
                  IsRectangle={IsRectangle}
                  key={course.id}
                  courseName={course.name}
                  courseTeacher={teachers[course.id]}
                  borderColor={course.isSubscribed ? '#beb1eeff' : '#e7e3f5ff'}
                >
                  <div
                    className={`flex items-end pb-4 justify-center ${IsRectangle ? 'h-[157px] w-[264px]' : 'h-[240px] w-[240px]'}
                      ${course.cover_image ? 'bg-cover bg-center bg-no-repeat' : 'bg-[#ececec]'}`}
                    style={course.cover_image ? { backgroundImage: `url(${BASE_IMAGE_URL}${imagePath})` } : {}}
                  >
                    {!course.isSubscribed && (
                      <Button
                        text="Inscrever-se"
                        size="small"
                        className="w-[80%] z-10 p-2 shadow-none text-cinza-900 bg-gray-300 border-cinza hover:shadow-none opacity-0 group-hover:opacity-100 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubscribe(course.id)
                        }}
                      />
                    )}
                  </div>
                </ModalSquareForm>
              </div>
            </div>
          )})
        ) : hasLabs ? (
          labs!.map((lab) => (
            <div
              key={lab.link}
              title={lab.alt}
              onClick={() => window.open(lab.link, '_blank')}
              className="cursor-pointer mr-6"
            >
              <ModalSquareForm
                IsRectangle={IsRectangle}
                key={lab.link}
                courseName={lab.name}
                courseTeacher={lab.type}
              >
                <div className={`bg-gray-300 p-4 flex items-center justify-center ${IsRectangle ? 'h-[205px] w-[265px]' : 'h-[240px] w-[240px]'}`}>
                  <img src={lab.image} alt={lab.alt} className="w-full h-full object-contain"/>
                </div>
              </ModalSquareForm>
            </div>
          ))
        ) : (
          // Caso usuário não esteja em nenhum curso
          <p className="ml-2 text-xl text-gray-600">
            Você ainda não está matriculado em nenhum curso
          </p>
        )}
      </div>
      {/* <Button onClick={() => navigate('/courses')} text="ver mais"></Button> */}
    </div>
  )
}
