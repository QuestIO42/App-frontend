import ExerciseTemplate from "../utility/ExerciseTemplate"
import LockIcon from "../svgComponents/icons/LockIcon"
import UnlockIcon from "../svgComponents/icons/UnlockIcon"
import { Quiz } from "../../interfaces/Quiz"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchRemainingTries } from "@/services/api/quiz"

interface ExercisesGroupProps{
    itens : Quiz[],
}

interface QuizStatus {
  try: number
  max_tries: number
  remaining_tries: number
}

export default function ExercisesGroup({itens} : ExercisesGroupProps) {
    const navigate = useNavigate()
    const location = useLocation()

    const [quizStatusMap, setQuizStatusMap] = useState<Record<string, QuizStatus>>({})

    useEffect(() => {
      // Função: Busca o status (tentativas) de cada quiz
      const fetchTries = async () => {
        const results = await Promise.all(itens.map(async (quiz) => {
          try {
            const response = await fetchRemainingTries(quiz.id);
            return { id: quiz.id, status: response };
          } catch (error) {
            console.error("Erro ao buscar tentativas:", error);
            // Fallback: 0 tentativas restantes
            return { id: quiz.id, status: { try: 0, max_tries: 1, remaining_tries: 0 } };
          }
        }))

        const statusMap: Record<string, QuizStatus> = {};
        results.forEach((result) => {
          statusMap[String(result.id)] = result.status;
        });

        setQuizStatusMap(statusMap)
      }

      fetchTries()
    }, [])

    // Função: Navega para a página do quiz escolhido
    const handleClick = (quiz: Quiz) => {
      localStorage.setItem("quizName", quiz.name)
      localStorage.setItem("quizDesc", quiz.description)
      navigate(location.pathname + "/quiz/" + quiz.id)
    }

    return(
        <div className="mt-10 mr-8">
            <div className="flex flex-col ml-2 gap-8">
              {itens.map((quiz, index) => {
                const status = quizStatusMap[String(quiz.id)];
                const remainingTries = Number(status?.remaining_tries);
                const isLocked = remainingTries === 0;

                const Icon = isLocked ? LockIcon : UnlockIcon;

                return (
                  <ExerciseTemplate
                    text={quiz.name}
                    Icon={Icon}
                    size="medium"
                    onClick={!isLocked ? () => handleClick(quiz) : undefined}
                    disabled={isLocked}
                    key={`${quiz.name}-${index}`}
                  />
                );
              })}
            </div>
        </div>
    )
}
