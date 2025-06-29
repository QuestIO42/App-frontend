import ExerciseTemplate from "../utility/ExerciseTemplate"
import LockIcon from "../svgComponents/icons/LockIcon"
import UnlockIcon from "../svgComponents/icons/UnlockIcon"
import GreenCheckIcon from "../svgComponents/icons/GreenCheckIcon"
import WrongIcon from "../svgComponents/icons/WrongIcon"
import { Quiz } from "../../interfaces/Quiz"
import { useNavigate, useLocation } from "react-router-dom"

interface ExercisesGroupProps{
    itens : Quiz[],
}

export default function ExercisesGroup({itens} : ExercisesGroupProps) {
    const stateIcons = {0: LockIcon, 1: UnlockIcon, 2: GreenCheckIcon, 3: WrongIcon};

    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = (quiz: Quiz) => {
      localStorage.setItem("quizName", quiz.name)
      localStorage.setItem("quizDesc", quiz.description)
      console.log("MAX TRIES: " + quiz.max_tries)
      navigate(location.pathname + "/quiz/" + quiz.id)
    }

    return(
        <div className="mt-10">
            <div className="flex flex-col ml-2 gap-8">
                {itens.map((content,index) => (
                      <ExerciseTemplate text={content.name}
                      Icon={stateIcons[1]}
                      size="medium"
                      onClick={() => handleClick(content)}
                      key={`${content.name}-${index}`}/>
                ))}
            </div>
        </div>
    )
}
