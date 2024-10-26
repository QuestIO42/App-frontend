import { ElementType } from 'react'
import Button from '../utility/Button'
import ModalSquareForm from '../utility/ModalSquareForm'

interface CoursesTemplateProps {
  title: string
  Icon: ElementType
  IsRectangle: boolean
}

export default function CoursesTemplate({ title, Icon, IsRectangle }: CoursesTemplateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="ml-14 mr-auto flex items-center justify-center gap-3">
        <Icon width="48" height="48"></Icon>
        <h2 className="mr-auto text-4xl font-bold text-cinza">{title}</h2>
      </div>

      <div className="ml-12 flex flex-wrap justify-center gap-16">
        {[...Array(3)].map((_, index) => (
          <ModalSquareForm key={index}>
            <div className={`bg-red-700 ${IsRectangle ? 'h-[157px] w-[264px]': 'h-[220px] w-[220px]' }`}></div>

          </ModalSquareForm>
        ))}
      </div>
      <Button text="ver mais"></Button>
    </div>
  )
}
