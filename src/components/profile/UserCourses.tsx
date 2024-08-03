import BookIcon from '../svgComponents/icons/BookIcon'
import ModalSquareForm from '../utility/ModalSquareForm'
import Button from '../utility/Button'

export default function UserCourses() {
  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <div className="mr-auto flex items-center justify-center gap-3">
        <BookIcon />
        <h2 className="text-left text-4xl font-bold">Meus Cursos</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-20">
        {[...Array(4)].map((_, index) => (
          <ModalSquareForm key={index}>
            <div className="h-[266px] w-[266px] bg-red-700"></div>
          </ModalSquareForm>
        ))}
      </div>
    </div>
  )
}
