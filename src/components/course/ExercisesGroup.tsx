import { ElementType } from "react"
import ExerciseTemplate from "../utility/ExerciseTemplate"
import LockIcon from "../svgComponents/icons/LockIcon"


interface ExercisesGroupProps{
    title : string,
    Icon : ElementType,
    //itens : number,
    //exerciseComponent : ElementType[]
}

export default function ExercisesGroup({title, Icon} : ExercisesGroupProps) {
    const vetor = ["Iniciando circuitos", "Circuitos Combinacionais", "Circuitos sequênciais", "Vetores"]

    return(
        <div className="">
            <div className="flex justify-start items-center content-center my-8 text-2xl gap-y-3 font-bold">
                <Icon className="h-8 w-12"/>
                <p className="grow text-3xl">{title}</p>
            </div>

            <div className="flex flex-col ml-10 gap-8">
                {vetor.map((content) => (
                    <ExerciseTemplate text={content} Icon={LockIcon} size="small"/>
                ))}
            </div>
        </div>
    )
}
