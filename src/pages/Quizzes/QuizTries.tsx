import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuestion } from '@/services/api/quiz';
import { getQuizAnswers, getAllAnswers } from '@/services/api/answer';
import { useAuth } from '@/hooks/useAuth';
import { Question, UserQuizQuestionAnswer } from '@/interfaces/Quiz';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Voltar from '@/components/course/Voltar';
import Paragraph from '@/components/quiz/Paragraph';
import Description from '@/components/quiz/Description';
import RadioButtonGroup from '@/components/quiz/RadioButtonGroup';
import QuestionBox from '@/components/quiz/QuestionBox';
import OpenAnswer from '@/components/quiz/OpenAnswer';
import Practice from '@/components/verilogIDE/Practice';

interface Answer {
  answer: string;
  id_question: string;
  value?: number;
  id: string;
  description?: string;
}

interface UserAnswer {
  id_question: string;
  answer: string;
  value: number;
  type: number;
}

export default function QuizTries() {
  const { quizId, currentTry } = useParams<{ quizId: string; currentTry: string }>();
  const { user } = useAuth();
  const userId = user?.id.toString() || '';

  const [UserQuizQuestion, setUserQuizQuestion] = useState<UserQuizQuestionAnswer[]>();
  const [Questions, setQuestions] = useState<Question[]>();
  const [UserAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [possibleAnswers, setPossibleAnswers] = useState<Record<string, Answer[]>>({});
  const verilogAnswersRef = useRef<Record<string, string>>({});

  const [score, setScore] = useState(0);
  const [quizMaxScore, setQuizMaxScore] = useState(0);

  const nome = localStorage.getItem('quizName');
  const [quizDesc, setQuizDesc] = useState("Descrição do questionário");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!nome) return;
    const originalTitle = document.title;
    document.title = `${originalTitle} - ${nome}`;
    return () => {
      document.title = originalTitle;
    };
  }, [nome]);

  useEffect(() => {
    const desc = localStorage.getItem("quizDesc") || "";
    setQuizDesc(desc);
  }, []);

  useEffect(() => {
    if (!quizId || !user) return;

    const startQuiz = async () => {
      try {
        const response = await getQuizAnswers(userId, quizId, Number(currentTry), true);
        const userAnswersData = response.answers;
        // Questões do quiz e respostas do usuário
        setUserQuizQuestion(userAnswersData);

        // Pontuação do usuário e pontuação máxima do quiz
        setScore(response.score);
        setQuizMaxScore(response.quiz_max_score);

        const questionIds = userAnswersData.map((item: UserQuizQuestionAnswer) => item.id_question);
        const questionObjects = await fetchQuestion(questionIds);
        setQuestions(questionObjects);

        const mcQuestionIds = questionObjects
          .filter((q) => q.type === 1)
          .map((q) => q.id);

        const allAnswersArrays: Answer[][] = await getAllAnswers(mcQuestionIds);
        const map: Record<string, Answer[]> = {};
        allAnswersArrays.forEach((arr) => {
          if (arr.length > 0) {
            const idq = arr[0].id_question;
            map[idq] = arr;
          }
        });
        setPossibleAnswers(map);

        const existingAnswers: UserAnswer[] = userAnswersData
          .map((item: UserQuizQuestionAnswer) => {
            if ((item as any).id_answer) {
              const chosenId = (item as any).id_answer as string;
              const alternativas = map[item.id_question] || [];
              const chosenObj = alternativas.find(ans => ans.id === chosenId);
              return {
                id_question: item.id_question,
                answer: chosenId,
                value: chosenObj ? chosenObj.value : 0,
                type: 1,
              };
            }
            if ((item as any).text_answer && questionObjects.find(q => q.id === item.id_question)?.type === 2) {
              return {
                id_question: item.id_question,
                answer: (item as any).text_answer as string,
                value: 0,
                type: 2,
              };
            }
            return null;
          })
          .filter((x: UserAnswer | null): x is UserAnswer => x !== null);

        setUserAnswers(existingAnswers);

        const initialVerilog: Record<string, string> = {};
        questionObjects.forEach((question) => {
          if (question.type === 3) {
            const found = userAnswersData.find((item: UserQuizQuestionAnswer) => item.id_question === question.id);
            if (found && (found as any).text_answer) {
              initialVerilog[question.id] = (found as any).text_answer as string;
            }
          }
        });
        verilogAnswersRef.current = initialVerilog;

      } catch (error) {
        console.error('Erro ao buscar as questões ou alternativas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    startQuiz();
  }, [quizId]);

  const renderQuestions = (questions: Question[]) => {
    return questions.map((question) => {
      const resultData = UserQuizQuestion?.find(
        (answer) => answer.id_question === question.id
      );

      const getTitle = (type: number) => {
        switch (type) {
          case 1:
            return 'Múltipla Escolha';
          case 2:
            return 'Resposta Aberta';
          case 3:
            return 'Verilog';
          default:
            return 'Conteúdo';
        }
      };

      return (
        <div key={question.id} className="w-full relative group">
          <div className="w-full my-3" key={question.id}>
            <div className="w-full flex flex-row justify-between">
              <div className={`w-fit flex self-start justify-center px-8 py-2 mb-6 font-bold bg-[#DDDDDD] shadow-default-cinza text-[#777]`}>
                  <p className="text-left text-2xl">{getTitle(question.type)}</p>
              </div>
            </div>

            {question.type === 0 && (
              <div className="flex mx-auto items-start px-10 py-12 border-2 border-[#a8a8a8] bg-white">
                <Paragraph title={question.name} text={question.content} />
              </div>
            )}

            {question.type === 1 && (() => {
              const alternativesForThis: Answer[] = possibleAnswers[question.id] || [];
              const userAnswerForThis = UserAnswers.find(
                (ans) => ans.id_question === question.id
              );

              const selectedDescription =
                alternativesForThis.find((ans) => ans.id === userAnswerForThis?.answer)
                  ?.description || '';

              return (
                <QuestionBox key={question.id}>
                  <div className="flex flex-col gap-6">
                    <Paragraph title={question.name} text={question.content} />

                    <RadioButtonGroup
                      initialValue={selectedDescription}
                      handleAnswer={() => {}}
                      values={alternativesForThis.map((ans) => ans.description ?? '')}
                      name={`question-${question.id}`}
                      verified={!!resultData}
                      correct={resultData ? resultData.score !== 0 : false}
                      verifiedValue={selectedDescription}
                      disabled={true}
                    />
                  </div>
                </QuestionBox>
              );
            })()}

            {question.type === 2 && (() => {
              const initialText = UserAnswers.find((ans) => ans.id_question === question.id)?.answer;

              return (
                <QuestionBox key={question.id}>
                  <div className="flex flex-col gap-4">
                    <Paragraph title={question.name} text={question.content} />

                    <OpenAnswer
                      id_question={question.id}
                      initialValue={initialText || ''}
                      handleAnswer={() =>{}}
                      verified={!!resultData}
                      correct={resultData ? resultData.score !== 0 : false}
                      disabled={true}
                    />
                  </div>
                </QuestionBox>
              );
            })()}

            {question.type === 3 && (
              <div key={question.id} className="w-full mx-auto">
                <Practice
                  question={question}
                  id_quiz={quizId}
                  initialCode={verilogAnswersRef.current[question.id] || ''}
                  onChangeCode={(id_question, code) => {
                    verilogAnswersRef.current[id_question] = code;
                  }}
                  disabled={true}
                  score={resultData?.score}
                />
              </div>
            )}
          </div>
        </div>
      )
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full min-h-screen bg-grid-pattern overflow-x-hidden">
        <Header />

        <div className="flex flex-col col-span-full justify-start gap-4">
          <div className="w-30 justify-start">
            <div className="ml-10 md:ml-20 mt-10">
              <Voltar />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-black">{nome}</h1>
            <div className="flex my-6 px-10 justify-center">
              <Description text={quizDesc} variant={'purple'} />
            </div>
          </div>
        </div>

        <div className="flex gap-8 pb-12 px-4 sm:px-8 md:px-20">
          <div className="w-full transition-all duration-300 flex flex-col gap-8 items-center">
            <div className="px-8 py-5 bg-roxo-300 shadow-default-roxo-500">
              <p className="text-[#bab1fc] font-bold">{score}/{quizMaxScore}</p>
            </div>

            {Questions && renderQuestions(Questions)}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
