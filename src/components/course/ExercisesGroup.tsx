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
    }, [itens])

    // Função: Navega para a página do quiz escolhido
    const handleClick = (quiz: Quiz) => {
      localStorage.setItem("quizName", quiz.name)
      console.log(quiz.description)
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
        <div className="mt-10 mr-12 p-5 border border-cinza-900 bg-white text-cinza-900">
          Carregando quizzes...
        </div>
      )
    }

    return (
      <div className="w-full flex flex-col gap-6">
        {itens.map((quiz, index) => {
          const status = quizStatusMap[String(quiz.id)];
          const remainingTries = Number(status?.remaining_tries);
          const isLocked = remainingTries === 0 && !status.is_open;
          const Icon = isLocked ? LockIcon : UnlockIcon;

          return (
            <div
              key={`quiz-wrapper-${quiz.id}`}
              className="flex flex-col gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-200"
            >
              <ExerciseTemplate
                text={quiz.name}
                Icon={Icon}
                size="medium"
                onClick={!isLocked ? () => handleClick(quiz) : undefined}
                disabled={isLocked}
                current_try={status.try}
                max_tries={status.max_tries}
              />

              {status && (() => {
                const triesCount = status.is_open ? status.try - 1 : status.try;
                if (triesCount <= 0) return null;

                return (
                  <div className="flex flex-col gap-2 mt-4">
                    {Array.from({ length: triesCount }).map((_, i) => (
                      <button
                        key={quiz.id + `try-${i}`}
                        onClick={() => handleTriesClick(quiz, i + 1)}
                        className="w-full h-12 border border-gray-300 bg-cinza-300 text-start px-6 text-[#888] text-lg font-bold rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:text-cinza-900 hover:scale-[1.01]"
                      >
                        Tentativa {i + 1}
                      </button>
                    ))}
                  </div>
                );
              })()}
            </div>
          );
        })}
      </div>
    );

}
