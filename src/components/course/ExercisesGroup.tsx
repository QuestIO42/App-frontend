import { ElementType } from "react"
import ExerciseTemplate from "../utility/ExerciseTemplate"
import LockIcon from "../svgComponents/icons/LockIcon"
import UnlockIcon from "../svgComponents/icons/UnlockIcon"
import GreenCheckIcon from "../svgComponents/icons/GreenCheckIcon"
import WrongIcon from "../svgComponents/icons/WrongIcon"
import { Quiz } from "../../interfaces/Quiz"
import { useNavigate, useLocation } from "react-router-dom"

interface ExercisesGroupProps{
    title : string,
    Icon : ElementType,
    itens : Quiz[],
    //states : number[],
    /*states: indica o estado de um exercício... será necessário que isso seja um vetor para que sejam passados os estados de todos os exercícios, porém não sei como isso seria atribuído em cada caixa de exercício e não realizei essa alteração*/
    //exerciseComponent : ElementType[]
}

export default function ExercisesGroup({title, Icon, itens} : ExercisesGroupProps) {
    const stateIcons = {0: LockIcon, 1: UnlockIcon, 2: GreenCheckIcon, 3: WrongIcon};
    /*Aqui há os números que representam o estado de cada exercício representados estaticamente. Para que a atribuição seja feita dinamicamente com base no banco dados, pode ser necessário alterar isso. */
    const navigate = useNavigate()
    const location = useLocation()
    const handleClick = (quiz: Quiz) => {
      localStorage.setItem("quizName", quiz.name)
      navigate(location.pathname + "/quiz/" + quiz.id)

    }

    return(
        <div className="">
            <div className="flex justify-start items-center content-center my-8 text-2xl gap-y-3 font-bold">
                <Icon className="h-8 w-12"/>
                <p className="grow text-4xl text-cinza">{title}</p>
            </div>

            <div className="flex flex-col ml-10 gap-8">
                {itens.map((content) => (
                      <ExerciseTemplate text={content.name}
                      Icon={stateIcons[1]}
                      size="medium"
                      onClick={() => handleClick(content)}/>
                ))}
            </div>
        </div>
    )
}
