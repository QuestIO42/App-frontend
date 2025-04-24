import { ElementType } from 'react'
// import Button from '../utility/Button'
import ModalSquareForm from '../utility/ModalSquareForm'
import { Course } from '@/interfaces/Course'
// import { fetchAllQuizes } from '@/services/api/quiz'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  const handleClick = (id: string, description: string) => {
    // alert(id);
    if (description == "Laboratório"){
      window.open(id, '_blank');
    }
    else{
      navigate(`/Course/${id}`)
    }
    // getQuiz()
  }

  return (
    <div className="flex flex-col items-start justify-start gap-10">
      <div
        className={`mr-auto flex items-center justify-center gap-3`}
      >
        <Icon width="48" height="48"></Icon>
        <h2 className="mr-auto text-4xl font-bold text-cinza">{title}</h2>
      </div>

      <div className="ml-3 flex flex-wrap items-start justify-start gap-16">
        {hasCourses
          ? courses.slice(0, 3).map((course) => (
            <div
              key={course.id}
              onClick={() => handleClick(course.id, course.description)}
              className="cursor-pointer"
            >
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
            </div>
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
      {/* <Button onClick={() => navigate('/courses')} text="ver mais"></Button> */}
    </div>
  )
}
