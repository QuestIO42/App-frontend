import ExerciseTemplate from "../utility/ExerciseTemplate"
import LockIcon from "../svgComponents/icons/LockIcon"
import UnlockIcon from "../svgComponents/icons/UnlockIcon"
import { Quiz } from "../../interfaces/Quiz"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchRemainingTries } from "@/services/api/quiz"
import { useAuth } from "@/hooks/useAuth"
import { getQuizAnswers } from "@/services/api/answer"

interface ExercisesGroupProps{
    itens : Quiz[],
}

interface AttemptInfo {
  try_number: number
  score: number
  max_score: number
}

interface QuizStatus {
  try: number
  max_tries: number
  remaining_tries: number
  is_open: boolean
  attempts?: AttemptInfo[]
}

export default function ExercisesGroup({itens} : ExercisesGroupProps) {
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useAuth()
    const userId = user?.id?.toString() || ""

    const [quizStatusMap, setQuizStatusMap] = useState<Record<string, QuizStatus>>({})

    useEffect(() => {
      if (!userId || !itens.length) return

      // Função: Busca o status (tentativas) de cada quiz
      const fetchTries = async () => {
        const results = await Promise.all(
          itens.map(async (quiz) => {
            try {
              const response = await fetchRemainingTries(quiz.id);
              const attempts = [];
              for (let i = 1; i <= response.try; i++) {
                try {
                  const attemptData = await getQuizAnswers(userId, quiz.id, i, true);
                  attempts.push({
                    try_number: i,
                    score: attemptData.score || 0,
                    max_score: attemptData.quiz_max_score || 0,
                  });
                } catch (err) {
                  console.warn(`Erro ao buscar tentativa ${i} do quiz ${quiz.id}:`, err);
                }
              }

              return {
                id: quiz.id,
                status: { ...response, attempts },
              };
            } catch (error) {
              console.error("Erro ao buscar tentativas:", error);
              return {
                id: quiz.id,
                status: { try: 0, max_tries: 0, remaining_tries: 0, attempts: [] },
              };
            }
          })
        );

        const statusMap: Record<string, QuizStatus> = {};
        results.forEach((result) => {
          statusMap[String(result.id)] = result.status;
        });

        setQuizStatusMap(statusMap);
      };

      fetchTries();
    }, [itens, userId]);

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

              {status?.attempts && status.attempts.length > 0 && (() => {
                // Excluir tentativa em aberto, se houver
                const displayedAttempts = status.is_open
                  ? status.attempts.slice(0, -1)
                  : status.attempts;

                if (displayedAttempts.length === 0) return null;

                return (
                  <div className="flex flex-col gap-2 mt-2">
                    {displayedAttempts.map((attempt) => (
                      <button
                        key={`${quiz.id}-try-${attempt.try_number}`}
                        onClick={() => handleTriesClick(quiz, attempt.try_number)}
                        className="w-full h-12 border border-gray-300 bg-cinza-300 text-start px-6 text-[#888] text-lg font-bold rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:text-cinza-900 hover:scale-[1.005]"
                      >
                        Tentativa {attempt.try_number}
                        <span className="float-right text-sm text-gray-600 font-normal">
                          {attempt.score}/{attempt.max_score} pts
                        </span>
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
