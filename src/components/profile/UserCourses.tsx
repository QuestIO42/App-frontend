import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Course } from '@/interfaces/Course'
import { User } from '@/interfaces/User'
import { getUsersInCourse } from '@/services/api/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import ModalSquareForm from '../utility/ModalSquareForm'

interface UserCoursesProps {
  courses: Course[]
}

export default function UserCourses({ courses }: UserCoursesProps) {
  const hasCourses = courses && courses.length > 0;
  const [teachers, setTeachers] = useState<Record<string, string>>({})
  const navigate = useNavigate();

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


  return (
    <div className="flex flex-col items-start justify-start">
      <div className="flex min-w-[260px] py-4 px-6 items-center justify-center text-[#777] bg-[#DDD] shadow-default-cinza gap-4">
        <FontAwesomeIcon icon={faBookmark} className="text-3xl" />
        <h2 className="text-left text-2xl font-bold">Meus Cursos</h2>
      </div>

      {/* Caso usuário não esteja em nenhum curso */}
      {!hasCourses && (
        <p className="ml-2 text-xl text-gray-600 mt-8 p-5 border border-gray-400 bg-white">
          Você ainda não está matriculado em nenhum curso!
        </p>
      )}

      <div className="ml-4 flex flex-wrap items-start justify-start gap-16 mt-12">
        {hasCourses
          && courses.map((course) => (
            <div
              key={course.id}
              onClick={() => navigate(`/Course/${course.id}`)}
              className="cursor-pointer"
            >
              <ModalSquareForm
                key={course.id}
                courseName={course.name}
                courseTeacher={teachers[course.id]}
                borderColor="roxo-900"
              >
                <div className="h-[266px] w-[266px] bg-roxo-500"></div>
              </ModalSquareForm>
            </div>
          ))
        }
      </div>
    </div>
  )
}
