import { Course } from '@/interfaces/Course'
import BookmarkIcon from '../svgComponents/icons/BookmarkIcon'
import ModalSquareForm from '../utility/ModalSquareForm'

interface UserCoursesProps {
  courses?: Course[]
}

export default function UserCourses({ courses }: UserCoursesProps) {
  const hasCourses = courses && courses.length > 0

  return (
    <div className="flex flex-col items-start justify-center gap-20">
      <div className="mr-auto flex items-center justify-center gap-3">
        <BookmarkIcon className="" />
        <h2 className="text-left text-4xl font-bold text-cinza">Meus Cursos</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-20">
        {hasCourses
          ? courses.map((course) => (
              <ModalSquareForm key={course.id}>
                <div className="h-[266px] w-[266px] bg-red-700">
                  <h2 className="mr-auto text-4xl font-bold text-cinza">
                    {course.name}
                  </h2>
                </div>
              </ModalSquareForm>
            ))
          : [...Array(4)].map((_, index) => (
              <ModalSquareForm key={index}>
                <div className="h-[266px] w-[266px] bg-red-700"></div>
              </ModalSquareForm>
            ))}
      </div>
    </div>
  )
}
