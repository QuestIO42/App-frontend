import { ElementType } from 'react'
import Button from '../utility/Button'
import ModalSquareForm from '../utility/ModalSquareForm'
import { Course } from '@/interfaces/Course'

interface CoursesTemplateProps {
  title: string
  Icon: ElementType
  IsRectangle: boolean
  courses: Course[]
}

export default function CoursesTemplate({
  title,
  Icon,
  IsRectangle,
  courses,
}: CoursesTemplateProps) {
  const hasCourses = courses && courses.length > 0

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div
        className={`mr-auto flex items-center justify-center gap-3 ${IsRectangle ? 'ml-20' : 'ml-8'}`}
      >
        <Icon width="48" height="48"></Icon>
        <h2 className="mr-auto text-4xl font-bold text-cinza">{title}</h2>
      </div>

      <div className="ml-12 flex flex-wrap justify-center gap-16">
        {hasCourses
          ? courses.slice(0, 3).map((course) => (
              <ModalSquareForm
                IsRectangle={IsRectangle}
                key={course.id}
                courseName={course.name}
                courseTeacher={course.name}
              >
                <div
                  className={`bg-red-700 ${IsRectangle ? 'h-[157px] w-[264px]' : 'h-[240px] w-[240px]'}`}
                ></div>
              </ModalSquareForm>
            ))
          : [...Array(3)].map((_, index) => (
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
            ))}
      </div>
      <Button text="ver mais"></Button>
    </div>
  )
}
