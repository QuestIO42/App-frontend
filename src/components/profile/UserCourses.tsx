import BookmarkIcon from '../svgComponents/icons/BookmarkIcon'
import ModalSquareForm from '../utility/ModalSquareForm'

export default function UserCourses() {
  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <div className="mr-auto flex items-center justify-center gap-3">
        <BookmarkIcon className=""/>
        <h2 className="text-left text-4xl font-bold text-cinza">Meus Cursos</h2>
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
/* Esse componente (provavelmente) poderia ser substituido por CoursesTemplate.tsx adicionando uma propriedade que indica quando está ou não presente o círculo de progresso previsto no protótipo.*/