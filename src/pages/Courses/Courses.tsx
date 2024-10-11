import Header from "@/components/header/Header"
import Footer from "@/components/footer/Footer"
import ModalSquareForm from "@/components/utility/ModalSquareForm"
import CourseIcon from "@/components/svgComponents/icons/CourseIcon"

export default function Courses() {
  return (
    <div className="grid min-h-screen w-screen grid-cols-4 grid-rows-[auto,1fr,auto] gap-24 bg-grid-pattern">
      <Header />
      <div className="col-span-full flex flex-col items-center">
        <CourseIcon height={180} width={180}/> {/* tamanho total do svg*/}
        <h1 className="text-6xl font-bold text-cinza">Meus Cursos</h1>
      </div>
      <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 mx-5 content-center justify-items-center">
        {[...Array(8)].map((index) => (
            <ModalSquareForm key={index}>
              <div className="h-[220px] w-[220px] bg-red-700"></div>
            </ModalSquareForm>
        ))}
      </div>
      <Footer />
    </div>
  )
}
