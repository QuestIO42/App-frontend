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
  is_open: boolean
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
            return { id: quiz.id, status: { try: 0, max_tries: 0, remaining_tries: 0 }};
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

    // Função: Navega para a página da tentativa escolhida
    const handleTriesClick = (quiz: Quiz, tryNumber: number) => {
      localStorage.setItem("quizName", quiz.name);
      localStorage.setItem("quizDesc", quiz.description);
      navigate(`${location.pathname}/quiz/${quiz.id}/try/${tryNumber}`);
    };

    // Mostrar loading enquanto não há dados de status
    if (Object.keys(quizStatusMap).length === 0) {
      return (
        <div className="mt-10 mr-4 p-5 border border-cinza bg-white text-cinza">
          Carregando quizzes...
        </div>
      )
    }

    return(
      <div className="mr-12">
          <div className="flex flex-col">
            {itens.map((quiz, index) => {
              const status = quizStatusMap[String(quiz.id)];
              const remainingTries = Number(status?.remaining_tries);
              const isLocked = remainingTries === 0 && !status.is_open;
              const Icon = isLocked ? LockIcon : UnlockIcon;

              return (
                <div key={`quiz-wrapper-${quiz.id}`} className={`flex flex-col flex-wrap mb-2`}>
                  <ExerciseTemplate
                    text={quiz.name}
                    Icon={Icon}
                    size="medium"
                    onClick={!isLocked ? () => handleClick(quiz) : undefined}
                    disabled={isLocked}
                    current_try={status.try}
                    max_tries={status.max_tries}
                    key={`${quiz.name}-${index}`}
                  />

                  {status &&(
                    <div className="flex flex-col gap-3 mb-6">
                      {Array.from({ length: status.is_open ? status.try - 1 : status.try  }).map((_, i) => (
                        <button
                          key={quiz.id + `try-${i}`}
                          onClick={() => handleTriesClick(quiz, i + 1)}
                          className="w-full h-12 bg-[#FCFCFC] text-start px-6 text-[#888] text-lg border-[2px] border-[#BBB] font-bold cursor-pointer transition-all duration-200 ease-in-out
                                     hover:border-[#777] hover:text-cinza hover:scale-105">
                          Tentativa {i+1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
      </div>
    )
}
