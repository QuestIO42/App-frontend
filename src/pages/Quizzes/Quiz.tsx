import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Voltar from '@/components/course/Voltar';

import { fetchQuestion } from '@/services/api/quiz';
import { postNewQuiz, getQuizAnswers, updateUserAnswer, submitQuizAnswers, getAllAnswers } from '@/services/api/answer';

import { useAuth } from '@/hooks/useAuth';
import { Question, UserQuizQuestionAnswer } from '@/interfaces/Quiz';
import Paragraph from '@/components/quiz/Paragraph';
import Description from '@/components/quiz/Description';
import RadioButtonGroup from '@/components/quiz/RadioButtonGroup';
import QuestionBox from '@/components/quiz/QuestionBox';
import OpenAnswer from '@/components/quiz/OpenAnswer';
import Practice from '@/components/verilogIDE/Practice';
import Button from '@/components/utility/Button';

interface Answer {
  answer: string;
  id_question: string;
  value: number;
  id: string;
  description: string;
}

interface UserAnswer {
  id_question: string;
  answer: string;   // para múltipla: id da alternativa; para aberta: texto
  value: number;    // pontuação local
  type: number;     // 1 = múltipla, 2 = aberta, 3 = Verilog, 0 = texto
}

export default function Quiz() {
  const { user } = useAuth();
  const userId = user?.id.toString() || '';

  const { quizId } = useParams();
  const [UserQuizQuestion, setUserQuizQuestion] = useState<UserQuizQuestionAnswer[]>();
  const [userQuizMap, setUserQuizMap] = useState<Record<string, string>>({});
  const [Questions, setQuestions] = useState<Question[]>();

  const [UserAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [verifiedValues, setVerifiedValues] = useState<Record<string, string>>({});
  const [description] = useState<string>(
    'Essa é a descrição para um questionário de um curso com uma coletânea de questões associadas e etc e tal. seria bom se quebrasse a linha k'
  );
  const [isLoading, setIsLoading] = useState(true);
  const nome = localStorage.getItem('quizName');

  // guarda o retorno de submitQuizAnswers: { [id_do_UserQuizQuestionAnswer]: { score, result, feedback? } }
  const [submissionResults, setSubmissionResults] = useState<
    Record<string, { score: string | number; result: string; feedback?: string | object }>
  >({});

  // mapeia cada id_question → lista de Answer (alternativas)
  const [possibleAnswers, setPossibleAnswers] = useState<Record<string, Answer[]>>({});

  /* Ajusta o título da página com o nome do quiz */
  useEffect(() => {
    if (!nome) return;
    const originalTitle = document.title;
    document.title = `${originalTitle} - ${nome}`;
    return () => {
      document.title = originalTitle;
    };
  }, [nome]);

  /* 1) Cria ou retoma as questões do quiz;
     2) Carrega o detalhe de cada pergunta;
     3) Busca alternativas de múltipla escolha */
  useEffect(() => {
    if (!quizId) return;

    const startQuiz = async () => {
      try {
        const response = await postNewQuiz(userId, quizId);

        let userQuizArray: UserQuizQuestionAnswer[];
        if (response.success) {
          userQuizArray = response.data;
        } else {
          console.log('[DEBUG] Chamando getQuizAnswers com:', {
            id_user: userId,
            id_quiz: quizId,
            current_try: response.current_try, // ou qualquer que seja o valor
          });
          userQuizArray = await getQuizAnswers(userId, quizId, response.current_try);
        }
        setUserQuizQuestion(userQuizArray);

        // 2a) detalhes das perguntas
        const questionIds = userQuizArray.map((item) => item.id_question);
        const questionObjects = await fetchQuestion(questionIds);
        setQuestions(questionObjects);

        // 2b) alternativas de múltipla escolha
        const allAnswersArrays: Answer[][] = await getAllAnswers(questionIds);
        const map: Record<string, Answer[]> = {};
        allAnswersArrays.forEach((arr) => {
          if (arr.length > 0) {
            const idq = arr[0].id_question;
            map[idq] = arr;
          }
        });
        setPossibleAnswers(map);
      } catch (error) {
        console.error('Erro ao buscar as questões ou alternativas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    startQuiz();
  }, [quizId]);

  /* Mapeia cada id_question → id (UUID) do objeto UserQuizQuestionAnswer */
  useEffect(() => {
    if (!UserQuizQuestion) return;
    const map: Record<string, string> = {};
    UserQuizQuestion.forEach((item) => {
      map[item.id_question] = item.id;
    });
    setUserQuizMap(map);
  }, [UserQuizQuestion]);

  /* Publica cada resposta ao backend via updateUserAnswer (intervalo opcional) */
  useEffect(() => {
    const INTERVAL_MS = 30_000;
    if (!isLoading && Object.keys(userQuizMap).length > 0) {
      const intervalId = setInterval(() => {
        publishAnswers();
      }, INTERVAL_MS);
      return () => clearInterval(intervalId);
    }
  }, [isLoading, userQuizMap, UserAnswers]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  /* 1) Atualiza UserAnswers conforme o usuário escolhe valor ou digita texto */
  const handleAnswer = (id_question: string, answer: string, score: number, type: number) => {
    setUserAnswers((prev) => {
      const idx = prev.findIndex((ans) => ans.id_question === id_question);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], answer, value: score, type };
        return updated;
      }
      return [...prev, { id_question, answer, value: score, correct: false, type }];
    });

    setVerifiedValues((prev) => ({
      ...prev,
      [id_question]: answer,
    }));
  };

  /* 2) Chama updateUserAnswer para cada resposta que já existe em UserAnswers */
  const publishAnswers = async () => {
    if (!quizId) return;
    for (const userAnswer of UserAnswers) {
      const userQuizAnswerId = userQuizMap[userAnswer.id_question];
      if (!userQuizAnswerId) {
        console.warn(`Não há UserQuizQuestionAnswer para id_question=${userAnswer.id_question}`);
        continue;
      }
      const payload: { text_answer?: string; id_answer?: string } = {};
      if (userAnswer.type === 1) {
        payload.id_answer = userAnswer.answer;
      } else if (userAnswer.type === 2) {
        payload.text_answer = userAnswer.answer;
      }
      try {
        await updateUserAnswer(userQuizAnswerId, payload);
      } catch (err) {
        console.error(`Erro ao atualizar resposta ${userQuizAnswerId}:`, err);
      }
    }
  };

  /* 3) Ao clicar em “Enviar Quiz”, validamos TODAS as respostas de uma vez no backend */
  const handleSubmit = async () => {
    if (!quizId) return;
    try {
      const resultsArray = await submitQuizAnswers(userId, quizId);
      const mapResults: Record<string, any> = {};
      resultsArray.forEach((item: any) => {
        mapResults[item.id] = {
          score: item.score,
          result: item.result,
          feedback: item.feedback,
        };
      });
      setSubmissionResults(mapResults);
    } catch (err) {
      console.error('Erro ao enviar respostas finais:', err);
    }
  };

  /* Renderiza cada pergunta em seu próprio bloco */
  const renderQuestions = (questions: Question[]) => {
    return questions.map((question) => {
      const userQuizAnswerId = userQuizMap[question.id];
      const resultObj = userQuizAnswerId
        ? submissionResults[userQuizAnswerId]
        : undefined;

      const alternativesForThis: Answer[] = possibleAnswers[question.id] || [];

      // Conteúdo (tipo 0)
      if (question.type === 0) {
        return (
          <div key={question.id} className="w-[90%] mx-auto my-6">
            <Paragraph title={question.name} text={question.content} />
          </div>
        );
      }

      // Múltipla escolha (tipo 1)
      if (question.type === 1) {
        return (
          <QuestionBox questionType={1} key={question.id}>
            <div className="flex flex-col gap-6">
              <Paragraph title={question.name} text={question.content} />

              <RadioButtonGroup
                handleAnswer={(value: string) => {
                  const found = alternativesForThis.find((ans) => ans.description === value);
                  handleAnswer(question.id, value, found?.value ?? 0, question.type);
                }}
                values={alternativesForThis.map((ans) => ans.description)}
                name={`question-${question.id}`}
                verified={!!verifiedValues[question.id]}
                correct={resultObj?.result === 'right'}
                verifiedValue={verifiedValues[question.id]}
              />

              {resultObj && (
                <div className="mt-2 p-2 border rounded bg-gray-50">
                  <p><strong>Resultado:</strong> {resultObj.result}</p>
                  <p><strong>Score:</strong> {resultObj.score}</p>
                  {resultObj.feedback && (
                    <div className="mt-1">
                      <strong>Feedback:</strong>{' '}
                      {typeof resultObj.feedback === 'object' ? (
                        <pre className="whitespace-pre-wrap text-sm">
                          {JSON.stringify(resultObj.feedback, null, 2)}
                        </pre>
                      ) : (
                        <span>{resultObj.feedback}</span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </QuestionBox>
        );
      }

      // Resposta aberta (tipo 2)
      if (question.type === 2) {
        return (
          <QuestionBox questionType={2} key={question.id}>
            <div className="flex flex-col gap-4">
              <Paragraph title={question.name} text={question.content} />

              <OpenAnswer
                id_question={question.id}
                handleAnswer={(value: string) =>
                  handleAnswer(question.id, value, 0, question.type)
                }
                verified={!!verifiedValues[question.id]}
                correct={resultObj?.result === 'right'}
              />

              {resultObj && (
                <div className="mt-2 p-2 border rounded bg-gray-50">
                  <p><strong>Resultado:</strong> {resultObj.result}</p>
                  <p><strong>Score:</strong> {resultObj.score}</p>
                  {resultObj.feedback && (
                    <div className="mt-1">
                      <strong>Feedback:</strong>{' '}
                      {typeof resultObj.feedback === 'object' ? (
                        <pre className="whitespace-pre-wrap text-sm">
                          {JSON.stringify(resultObj.feedback, null, 2)}
                        </pre>
                      ) : (
                        <span>{resultObj.feedback}</span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </QuestionBox>
        );
      }

      // Verilog (tipo 3)
      if (question.type === 3) {
        return (
          <div key={question.id} className="w-full mx-auto my-6">
            <Practice question={question} id_quiz={quizId!} />

            {resultObj && (
              <div className="mt-2 p-2 border rounded bg-gray-50">
                <p><strong>Resultado:</strong> {resultObj.result}</p>
                <p><strong>Score:</strong> {resultObj.score}</p>
                {resultObj.feedback && (
                  <div className="mt-1">
                    <strong>Feedback:</strong>{' '}
                    {typeof resultObj.feedback === 'object' ? (
                      <pre className="whitespace-pre-wrap text-sm">
                        {JSON.stringify(resultObj.feedback, null, 2)}
                      </pre>
                    ) : (
                      <span>{resultObj.feedback}</span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }

      return null;
    });
  };

  return (
    <>
      <div className="grid min-h-screen w-full overflow-x-hidden grid-cols-4 grid-rows-[auto,1fr,auto] gap-6 bg-grid-pattern">
        <Header />

        <div className="flex flex-col col-span-full justify-start gap-4">
          <div className="w-30 justify-start">
            <div className="ml-10 md:ml-20 mt-10">
              <Voltar />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-[#454545]">{nome}</h1>
            <div className="flex mt-5 mb-16 px-10 justify-center">
              <Description text={description} variant={'purple'} />
            </div>
          </div>
        </div>

        <div className="col-span-full w-full mb-16 flex flex-col gap-12 mx-auto items-center justify-center">
          {Questions && renderQuestions(Questions)}

          {/* Botão de envio geral */}
          <Button onClick={handleSubmit} className='bg-white' variant="primary" text="Enviar" />
        </div>

        <Footer />
      </div>
    </>
  );
}
