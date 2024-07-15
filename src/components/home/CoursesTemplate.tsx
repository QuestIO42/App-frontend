import { ElementType } from 'react'
import Button from '../form/Button'
import ModalSquareForm from '../wrapper/ModalSquareForm'

interface CoursesTemplateProps {
  title: string
  Icon: ElementType
}

export default function CoursesTemplate({ title, Icon }: CoursesTemplateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <div className="mr-auto flex items-center justify-center gap-3">
        <Icon></Icon>
        <h2 className="mr-auto text-4xl font-bold">{title}</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-20">
        {[...Array(3)].map((_, index) => (
          <ModalSquareForm key={index}>
            <div className="h-[266px] w-[266px] bg-red-700"></div>
          </ModalSquareForm>
        ))}
      </div>
      <Button text="Ver mais"></Button>
    </div>
  )
}
