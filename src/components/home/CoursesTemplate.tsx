import { ElementType } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ModalSquareForm from '../utility/ModalSquareForm'
import { Course } from '@/interfaces/Course'
import { Lab } from '@/interfaces/Lab'
import { User } from '@/interfaces/User'
import { getUsersInCourse } from '@/services/api/user'

// Interface aceita cursos e laboratórios de maneira opcional
interface CoursesTemplateProps {
  title: string;
  Icon: ElementType;
  IsRectangle: boolean;
  courses?: Course[];
  labs?: Lab[];
}

export default function CoursesTemplate({
  title,
  Icon,
  IsRectangle,
  courses = [],
  labs = [],
}: CoursesTemplateProps) {
  const hasCourses = courses && courses.length > 0
  const hasLabs = labs && labs.length > 0;
  const [teachers, setTeachers] = useState<Record<string, string>>({})
  const navigate = useNavigate()

  // Busca os professores de cada curso
  // Funciona para os cursos em que o usuário está inscrito e cursos abertos, caso contrário
  // o usuário não tem permissão para ver o professor (back-end)
  useEffect(() => {
    async function fetchTeachers() {
      try {
        const teachersArray = await Promise.all(
          courses.map(async (course) => {
            try {
              const users: User[] = await getUsersInCourse(course.id, 2)
              return { courseId: course.id, teacherName: users[0].full_name}
            } catch (error) {
              console.error(`Erro ao buscar professor para o curso ${course.id}:`, error)
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

  const handleClick = (id: string) => {
    // alert(id);

    navigate(`/Course/${id}`)

    // getQuiz()
  }

  return (
    <div className="flex flex-col items-start justify-start gap-10">
      <div className={`mr-auto flex items-center justify-center gap-3`}>
        <Icon width="48" height="48"></Icon>
        <h2 className="mr-auto text-4xl font-bold text-cinza">{title}</h2>
      </div>

      <div className="ml-3 flex flex-wrap items-start justify-start gap-16">
        {hasCourses ? (
          courses!.slice(0, 3).map((course) => (
            <div
              key={course.id}
              onClick={() => handleClick(course.id)}
              className="cursor-pointer"
            >
              <ModalSquareForm
                IsRectangle={IsRectangle}
                key={course.id}
                courseName={course.name}
                courseTeacher={teachers[course.id]}
              >
                <div
                  className={`bg-red-700 ${IsRectangle ? 'h-[157px] w-[264px]' : 'h-[240px] w-[240px]'}`}
                ></div>
              </ModalSquareForm>
            </div>
          ))
        ) : hasLabs ? (
          labs!.map((lab) => (
            <div
              key={lab.link}
              onClick={() => window.open(lab.link, '_blank')}
              className="cursor-pointer"
            >
              <ModalSquareForm
                IsRectangle={IsRectangle}
                key={lab.link}
                courseName={lab.name}
                courseTeacher={lab.teacher}
              >
                <div
                  className={`bg-red-700 ${IsRectangle ? 'h-[157px] w-[264px]' : 'h-[240px] w-[240px]'}`}
                ></div>
              </ModalSquareForm>
            </div>
          ))
        ) : (
          [...Array(3)].map((_, index) => (
            <ModalSquareForm
              IsRectangle={IsRectangle}
              key={index}
              courseName="Portas Lógicas"
              courseTeacher="Ricardo Menotti"
            >
              <div
                className={`bg-red-700 ${IsRectangle ? 'h-[157px] w-[264px]' : 'h-[240px] w-[240px]'}`}
              ></div>
            </ModalSquareForm>
          ))
        )}
      </div>
      {/* <Button onClick={() => navigate('/courses')} text="ver mais"></Button> */}
    </div>
  )
}
