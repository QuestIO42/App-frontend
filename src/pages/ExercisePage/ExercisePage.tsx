import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"
import Button from "@/components/utility/Button"
import { useNavigate } from "react-router-dom"

interface ExercisePageProps {
  title: string
  text: string[]
  link: string
}

export default function Test({
  title,
  text,
  link,
} : ExercisePageProps) {

  const navigate = useNavigate()
  const handleClick = () => {
    navigate(link)
  }

  return (
    <div className="grid min-h-screen w-screen grid-cols-4 grid-rows-[auto,1fr,auto] gap-6 bg-grid-pattern">
      <Header/>
      <div className="ml-20 mr-20 col-span-full flex flex-col items-center">
        <div className="bg-white min-w-[500px] p-8 m-8 border border-black">
          <h1 className="text-6xl font-bold text-cinza text-center mb-16">{title}</h1>
          <div className="m-8 pb-16 flex-col flex gap-10">
            {text.map((phrase, index) => (
              <p key={index}>{phrase}</p>
            ))}
          </div>
          <Button
            className="bg-laranja mb-8"
            variant="tertiary"
            text="Solução"
            size="large"
            onClick={handleClick}
          />

          <div className="h-80 overflow-y-scroll overflow-x-scroll border p-4 border-4 border-preto-default shadow-default-preto w-full mb-8">
          {/* ??? */}
          </div>

          <div className="h-60 overflow-y-scroll overflow-x-scroll border p-4 border-4 border-preto-default shadow-default-preto w-full ">
          {/* ??? */}
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  )
}
