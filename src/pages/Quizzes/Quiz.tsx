import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Voltar from '@/components/course/Voltar';

import { fetchQuestion } from '@/services/api/quiz';
import { fetchPostsByQuestion } from '@/services/api/post';
import { postNewQuiz, getQuizAnswers, updateUserAnswer, submitQuizAnswers, getAllAnswers } from '@/services/api/answer';

import { useAuth } from '@/hooks/useAuth';
import { Question, UserQuizQuestionAnswer } from '@/interfaces/Quiz';
import Paragraph from '@/components/quiz/Paragraph';
import Description from '@/components/quiz/Description';
import RadioButtonGroup from '@/components/quiz/RadioButtonGroup';
import QuestionBox from '@/components/quiz/QuestionBox';
import OpenAnswer from '@/components/quiz/OpenAnswer';
import ConfirmModal from '@/components/quiz/ConfirmModal';
import Practice from '@/components/verilogIDE/Practice';
import Button from '@/components/utility/Button';
import { Post } from '@/interfaces/Post';
import QuestionForumSidebar from '@/components/quiz/Forum/QuestionForumSidebar';

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

export default function Quiz() {
  const { quizId } = useParams();
  const { user } = useAuth();
  const userId = user?.id.toString() || '';

  const [UserQuizQuestion, setUserQuizQuestion] = useState<UserQuizQuestionAnswer[]>();
  const [userQuizMap, setUserQuizMap] = useState<Record<string, string>>({});
  const [Questions, setQuestions] = useState<Question[]>();
  const [UserAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [possibleAnswers, setPossibleAnswers] = useState<Record<string, Answer[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const nome = localStorage.getItem('quizName');

  const [posts, setPosts] = useState<Post[]>([]);
  const [, setIsLoadingPosts] = useState(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);

  const verilogAnswersRef = useRef<Record<string, string>>({});

  const [submissionResults, setSubmissionResults] = useState<
    Record<string, { score: string | number; result: string; feedback?: string | object }>
  >({});

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [quizDesc, setQuizDesc] = useState("Descrição do questionário");
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        const response = await postNewQuiz(userId, quizId);
        let userQuizArray: UserQuizQuestionAnswer[];

        if (response.success) {
          userQuizArray = response.data;
        } else {
          userQuizArray = await getQuizAnswers(userId, quizId, response.current_try);
        }
        setUserQuizQuestion(userQuizArray);

        const questionIds = userQuizArray.map((item) => item.id_question);
        const questionObjects = await fetchQuestion(questionIds);
        setQuestions(questionObjects);

        if (questionIds.length > 0 && quizId) {
            const promises = questionIds.map(id => fetchPostsByQuestion(id, quizId));
            const postsForAllQuestions = await Promise.all(promises);
            setPosts(postsForAllQuestions.flat());
        }

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

        const existingAnswers: UserAnswer[] = userQuizArray
          .map(item => {
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
          .filter((x): x is UserAnswer => x !== null);

        setUserAnswers(existingAnswers);

        const initialVerilog: Record<string, string> = {};
        questionObjects.forEach((question) => {
          if (question.type === 3) {
            const found = userQuizArray.find((item) => item.id_question === question.id);
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
        setIsLoadingPosts(false);
      }
    };

    startQuiz();
  }, [quizId, user]);

  useEffect(() => {
    if (!UserQuizQuestion) return;
    const map: Record<string, string> = {};
    UserQuizQuestion.forEach((item) => {
      map[item.id_question] = item.id;
    });
    setUserQuizMap(map);
  }, [UserQuizQuestion]);

  const handleAnswer = (
    id_question: string,
    answer: string,
    score: number | undefined,
    type: number
  ) => {
    setUserAnswers((prev) => {
      const value = score ?? 0;
      const idx = prev.findIndex((ans) => ans.id_question === id_question);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], answer, value, type };
        return updated;
      }
      return [...prev, { id_question, answer, value, type }];
    });
  };

  const publishAnswers = async () => {
    if (!quizId) return;

    for (const userAnswer of UserAnswers) {
      const userQuizAnswerId = userQuizMap[userAnswer.id_question];
      if (!userQuizAnswerId) continue;

      const payload: { text_answer?: string; id_answer?: string } = {};
      if (userAnswer.type === 1) {
        payload.id_answer = userAnswer.answer;
      } else if (userAnswer.type === 2) {
        payload.text_answer = userAnswer.answer;
      }

      try {
        await updateUserAnswer(userQuizAnswerId, payload);
      } catch (err) {
        console.error(`Erro ao salvar resposta ${userQuizAnswerId}:`, err);
      }
    }

    for (const [id_question, code] of Object.entries(verilogAnswersRef.current)) {
      const userQuizAnswerId = userQuizMap[id_question];
      if (!userQuizAnswerId) continue;

      const payload = { text_answer: code };
      try {
        await updateUserAnswer(userQuizAnswerId, payload);
      } catch (err) {
        console.error(`Erro ao salvar código Verilog ${userQuizAnswerId}:`, err);
      }
    }
  };

  useEffect(() => {
    const INTERVAL_MS = 20_000;
    if (!isLoading && Object.keys(userQuizMap).length > 0) {
      const intervalId = setInterval(() => {
        publishAnswers();
      }, INTERVAL_MS);
      return () => clearInterval(intervalId);
    }
  }, [isLoading, userQuizMap, UserAnswers]);

  const handleSubmit = async () => {
    if (!quizId) return;
    await publishAnswers();
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
      setIsSubmitted(true);
    } catch (err) {
      console.error('Erro ao enviar respostas finais:', err);
    }
  };

  const handleOpenDiscussion = (questionId: string) => {
    setActiveQuestionId(questionId);
    setIsSidebarOpen(true);
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts(prev => [newPost, ...(prev ?? [])]);
  };

  const renderQuestions = (questions: Question[]) => {
    return questions.map((question) => {
      const userQuizAnswerId = userQuizMap[question.id];
      const resultObj = userQuizAnswerId
        ? submissionResults[userQuizAnswerId]
        : undefined;

      // Container unificado para garantir que o botão e o hover funcionem para todos
      return (
        <div key={question.id} className="w-full relative group">

          {/* SEU CÓDIGO ORIGINAL VAI AQUI DENTRO, SEM ALTERAÇÕES */}

          {question.type === 0 && (
            <div className="w-[90%] my-3" key={question.id}>
            <div className="w-fit flex self-start justify-center px-8 py-2 mb-6 font-bold bg-[#DDDDDD] shadow-default-cinza text-[#777]">
              <p className="text-left text-2xl">Conteúdo</p>
            </div>

            <div className="flex mx-auto items-start px-10 py-12 border-2 border-[#a8a8a8] bg-white">
              <Paragraph title={question.name} text={question.content} />
            </div>
          </div>
          )}

          {question.type === 1 && (() => {
            const alternativesForThis: Answer[] = possibleAnswers[question.id] || [];
            const userAnswerForThis = UserAnswers.find((ans) => ans.id_question === question.id);
            const selectedDescription = alternativesForThis.find((ans) => ans.id === userAnswerForThis?.answer)?.description || '';

            return (
              <QuestionBox questionType={1}>
                <div className="flex flex-col gap-6">
                  <Paragraph title={question.name} text={question.content} />
                  <RadioButtonGroup
                    initialValue={selectedDescription}
                    handleAnswer={(value: string) => {
                      const found = alternativesForThis.find((ans) => ans.description === value);
                      if (!found) return;
                      handleAnswer(question.id, found.id, found.value ?? undefined, question.type);
                    }}
                    values={alternativesForThis.map((ans) => ans.description ?? '')}
                    name={`question-${question.id}`}
                    verified={!!resultObj}
                    correct={resultObj?.result === 'right'}
                    verifiedValue={selectedDescription}
                    disabled={isSubmitted}
                  />
                </div>
              </QuestionBox>
            );
          })()}

          {question.type === 2 && (() => {
            const initialText = UserAnswers.find((ans) => ans.id_question === question.id)?.answer;
            return (
              <QuestionBox questionType={2}>
                <div className="flex flex-col gap-4">
                  <Paragraph title={question.name} text={question.content} />
                  <OpenAnswer
                    id_question={question.id}
                    initialValue={initialText || ''}
                    handleAnswer={(value: string) => handleAnswer(question.id, value, 0, question.type)}
                    verified={!!resultObj}
                    correct={resultObj?.result === 'right'}
                    disabled={isSubmitted}
                  />
                </div>
              </QuestionBox>
            );
          })()}

          {question.type === 3 && (
            <div className="w-full mx-auto my-3">
              <Practice
                question={question}
                id_quiz={quizId}
                initialCode={verilogAnswersRef.current[question.id] || ''}
                onChangeCode={(id_question, code) => {
                  verilogAnswersRef.current[id_question] = code;
                }}
                disabled={isSubmitted}
              />
            </div>
          )}

          {/* Botão que agora funciona para todos os tipos de questão */}
          <div className="absolute top-4 right-4 z-10">
             <Button
                text="Ver Discussão"
                variant="quaternary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDiscussion(question.id);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity !py-1 !px-3 text-sm"
            />
          </div>
        </div>
      );
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
      {/* --- CORREÇÃO 3: Estrutura de layout simplificada --- */}
      <div className="w-full min-h-screen bg-grid-pattern">
        <Header />

        <div className="flex flex-col px-4 sm:px-8 md:px-12 py-10">
          <Voltar />
          <div className="flex flex-col items-center justify-center mt-4">
            <h1 className="text-4xl font-bold text-[#454545] text-center">{nome}</h1>
            <div className="flex mt-5 mb-10 px-10 justify-center">
              <Description text={quizDesc} variant={'purple'} />
            </div>
          </div>
        </div>

        <main className="flex gap-8 pb-12 px-4 sm:px-8 md:px-12">
          {/* Coluna Principal: Questões */}
          <div className={`transition-all duration-300 flex flex-col gap-8 items-center ${isSidebarOpen ? 'w-full md:w-2/3' : 'w-full'}`}>
            {Questions && renderQuestions(Questions)}
            <div className={`w-[80%] flex-wrap gap-12 items-center justify-center sm:justify-end ${isSubmitted ? "hidden" : "flex"}`}>
              <Button onClick={() => setShowSaveModal(true)} disabled={isSubmitted} className="bg-white py-3" variant="primary" text="Salvar Respostas" />
              <Button onClick={() => setShowConfirmModal(true)} disabled={isSubmitted} className="bg-white py-3" variant="primary" text="Finalizar Questionário" />
            </div>
          </div>

          {/* Coluna Lateral: Fórum (renderizada condicionalmente) */}
          {isSidebarOpen && (
            <div className="w-full md:w-1/3">
              <QuestionForumSidebar
                questionId={activeQuestionId}
                posts={posts ?? []}
                onPostCreated={handlePostCreated}
                onClose={() => setIsSidebarOpen(false)}
                quizId={quizId!}
              />
            </div>
          )}
        </main>

        {showSaveModal && (
          <ConfirmModal
            isOpen={showSaveModal}
            title="Salvar respostas"
            description="Deseja salvar suas respostas? Você poderá continuar o questionário depois."
            onCancel={() => setShowSaveModal(false)}
            onConfirm={async () => {
              setShowSaveModal(false);
              await publishAnswers();
            }}
          />
        )}

        {showConfirmModal && (
          <ConfirmModal
            isOpen={showConfirmModal}
            title="Enviar respostas"
            description="Você tem certeza de que deseja finalizar? Suas respostas serão enviadas e não poderão ser alteradas."
            onCancel={() => setShowConfirmModal(false)}
            onConfirm={async () => {
              setShowConfirmModal(false);
              await handleSubmit();
            }}
          />
        )}

        <Footer />
      </div>
    </>
  );
}
