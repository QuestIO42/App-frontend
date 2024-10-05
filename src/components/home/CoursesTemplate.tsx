import { ElementType } from 'react'
import Button from '../utility/Button'
import ModalSquareForm from '../utility/ModalSquareForm'

interface CoursesTemplateProps {
  title: string
  Icon: ElementType
}

export default function CoursesTemplate({ title, Icon }: CoursesTemplateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="ml-14 mr-auto flex items-center justify-center gap-3">
        <Icon></Icon>
        <h2 className="mr-auto text-4xl font-bold text-cinza">{title}</h2>
      </div>

      <div className="ml-12 flex flex-wrap justify-center gap-16">
        {[...Array(3)].map((_, index) => (
          <ModalSquareForm key={index} courseName="Portas Lógicas" courseTeacher="Ricardo Menotti">
            <div className="h-[240px] w-[240px] bg-red-700"></div>
          </ModalSquareForm>
        ))}
      </div>
      <Button text="ver mais"></Button>
    </div>
  )
}
