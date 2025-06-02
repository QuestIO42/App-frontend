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
import ConfirmModal from '@/components/quiz/ConfirmModal';
import Practice from '@/components/verilogIDE/Practice';
import Button from '@/components/utility/Button';

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

  // Armazena a tentativa atual do usuário com as questões associadas
  const [UserQuizQuestion, setUserQuizQuestion] = useState<UserQuizQuestionAnswer[]>();

  // Mapeia id da questão → id da resposta do usuário (UserQuizQuestionAnswer.id)
  const [userQuizMap, setUserQuizMap] = useState<Record<string, string>>({});

  // Armazena os detalhes das questões do quiz
  const [Questions, setQuestions] = useState<Question[]>();

  // Armazena as respostas que o usuário forneceu localmente
  const [UserAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  // Armazena as alternativas possíveis de múltipla escolha por pergunta
  const [possibleAnswers, setPossibleAnswers] = useState<Record<string, Answer[]>>({});

  // Armazena o código verilog que vem do componente Practice
  const [verilogAnswers, setVerilogAnswers] = useState<Record<string, string>>({});

  const [isLoading, setIsLoading] = useState(true);
  const nome = localStorage.getItem('quizName');

  // Armazena os resultados após o envio do quiz (pontuação, resultado e feedback)
  const [submissionResults, setSubmissionResults] = useState<
    Record<string, { score: string | number; result: string; feedback?: string | object }>
  >({});

  // Modal de confirmação e salvamento das respostas
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const [description] = useState<string>(
    'Essa é a descrição para um questionário de um curso com uma coletânea de questões associadas e etc e tal. seria bom se quebrasse a linha k'
  );

  // Estado do quiz, se já foi respondido ou não
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* Ajusta o título da página com o nome do quiz */
  useEffect(() => {
    if (!nome) return;
    const originalTitle = document.title;
    document.title = `${originalTitle} - ${nome}`;
    return () => {
      document.title = originalTitle;
    };
  }, [nome]);

  /*  Cria ou retoma as questões do quiz;
      Carrega o detalhe de cada pergunta;
      Busca alternativas de múltipla escolha */
  useEffect(() => {
    if (!quizId || !user) return;


    const startQuiz = async () => {
      try {
        // Inicia uma nova tentativa em um quiz, criando as questões
        const response = await postNewQuiz(userId, quizId);
        let userQuizArray: UserQuizQuestionAnswer[];

        if (response.success) {
          userQuizArray = response.data;
        } else {
          // Caso o usuário já tenha uma tentativa em aberto, apenas recupera as questões criadas anteriormente
          userQuizArray = await getQuizAnswers(userId, quizId, response.current_try);
        }
        setUserQuizQuestion(userQuizArray);

        // Carrega os detalhes de cada pergunta
        const questionIds = userQuizArray.map((item) => item.id_question);
        const questionObjects = await fetchQuestion(questionIds);
        setQuestions(questionObjects);

        // Carrega as alternativas de múltipla escolha
        const mcQuestionIds = questionObjects
        .filter((q) => q.type === 1)
        .map((q) => q.id);

        // Carrega as alternativas de múltipla escolha
        const allAnswersArrays: Answer[][] = await getAllAnswers(mcQuestionIds);
        const map: Record<string, Answer[]> = {};
        allAnswersArrays.forEach((arr) => {
          if (arr.length > 0) {
            const idq = arr[0].id_question;
            map[idq] = arr;
          }
        });
        setPossibleAnswers(map);

        // Carrega as respostas do usuário que já existiam, salvas no banco
        const existingAnswers: UserAnswer[] = userQuizArray
          .map(item => {
            // Múltipla escolha
            if ((item as any).id_answer) {
              const chosenId = (item as any).id_answer as string;
              const alternativas = map[item.id_question] || [];
              const chosenObj = alternativas.find(ans => ans.id === chosenId);
              return {
                id_question: item.id_question,
                answer: chosenId,
                value: chosenObj ? chosenObj.value : 0,
                type: 1,
              } as UserAnswer;
            }
            // Discursiva
            if ((item as any).text_answer) {
              return {
                id_question: item.id_question,
                answer: (item as any).text_answer as string,
                value: 0,
                type: 2,
              } as UserAnswer;
            }
            return null;
          })
          .filter((x): x is UserAnswer => x !== null);

        setUserAnswers(existingAnswers);

        // Carrega o código salvo para as questões de verilog
        const initialVerilog: Record<string,string> = {};
        questionObjects.forEach((question) => {
          if (question.type === 3) {
            // procura no userQuizArray o objeto que tem esse id_question
            const found = userQuizArray.find((item) => item.id_question === question.id);
            if (found && (found as any).text_answer) {
              initialVerilog[question.id] = (found as any).text_answer as string;
            }
          }
        });

        setVerilogAnswers(initialVerilog);
      } catch (error) {
        console.error('Erro ao buscar as questões ou alternativas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    startQuiz();
  }, [quizId, user]);

  /* Mapeia cada id_question → id (UUID) do objeto UserQuizQuestionAnswer */
  useEffect(() => {
    if (!UserQuizQuestion) return;
    const map: Record<string, string> = {};
    UserQuizQuestion.forEach((item) => {
      map[item.id_question] = item.id;
    });
    setUserQuizMap(map);
  }, [UserQuizQuestion]);

  /* Atualiza UserAnswers conforme o usuário escolhe valor ou digita texto */
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

  /* Função que salva cada resposta que já existe em UserAnswers */
  const publishAnswers = async () => {
    if (!quizId) return;

    // Salva múltipla escolha e discursivas
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

    // Salva respostas de verilog
    for (const [id_question, code] of Object.entries(verilogAnswers)) {
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

  /* Publica cada resposta ao backend via updateUserAnswer (intervalo de 20 segundos) */
  useEffect(() => {
    const INTERVAL_MS = 20_000;
    if (!isLoading && Object.keys(userQuizMap).length > 0) {
      const intervalId = setInterval(() => {
        publishAnswers();
      }, INTERVAL_MS);
      return () => clearInterval(intervalId);
    }
  }, [isLoading, userQuizMap, UserAnswers]);

  /* Função responsável por enviar as repostas do usuário e corrigir */
  const handleSubmit = async () => {
    if (!quizId) return;

    // Salva as questões
    await publishAnswers();

    // Após salvar as respostas, chama a correção
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


  /* Renderiza cada pergunta em seu próprio bloco */
  const renderQuestions = (questions: Question[]) => {
    return questions.map((question) => {
      const userQuizAnswerId = userQuizMap[question.id];
      const resultObj = userQuizAnswerId
        ? submissionResults[userQuizAnswerId]
        : undefined;

      // TIPO 0: Conteúdo
      if (question.type === 0) {
        return (
          <div className="w-[90%] my-6" key={question.id}>
            <div className="w-fit flex self-start justify-center px-8 py-2 mb-6 font-bold bg-[#DDDDDD] shadow-default-cinza text-[#777]">
              <p className="text-left text-2xl">Conteúdo</p>
            </div>

            <div className="flex mx-auto items-start px-10 py-12 border-2 border-[#a8a8a8] bg-white">
              <Paragraph title={question.name} text={question.content} />
            </div>
          </div>
        );
      }

      // TIPO 1: Múltipla escolha
      if (question.type === 1) {
        const alternativesForThis: Answer[] = possibleAnswers[question.id] || [];

        const userAnswerForThis = UserAnswers.find(
          (ans) => ans.id_question === question.id
        );

        const selectedDescription =
          alternativesForThis.find((ans) => ans.id === userAnswerForThis?.answer)
            ?.description || '';

        return (
          <QuestionBox questionType={1} key={question.id}>
            <div className="flex flex-col gap-6">
              <Paragraph title={question.name} text={question.content} />

              <RadioButtonGroup
                initialValue={selectedDescription}    // ← aqui você informa qual opção já estava salva
                handleAnswer={(value: string) => {
                  const found = alternativesForThis.find(
                    (ans) => ans.description === value
                  );
                  if (!found) return;
                  handleAnswer(
                    question.id,
                    found.id,
                    found.value ?? undefined,
                    question.type
                  );
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
      }

      // TIPO 2: Resposta aberta
      if (question.type === 2) {
        // Encontra resposta salva do usuário
        const initialText = UserAnswers.find((ans) => ans.id_question === question.id)?.answer;

        return (
          <QuestionBox questionType={2} key={question.id}>
            <div className="flex flex-col gap-4">
              <Paragraph title={question.name} text={question.content} />

              <OpenAnswer
                id_question={question.id}
                initialValue={initialText || ''}
                handleAnswer={(value: string) =>
                  handleAnswer(question.id, value, 0, question.type)
                }
                verified={!!resultObj}
                correct={resultObj?.result === 'right'}
                disabled={isSubmitted}
              />
            </div>
          </QuestionBox>
        );
      }

      // TIPO 3: Verilog
      if (question.type === 3) {
        return (
          <div key={question.id} className="w-full mx-auto my-6">
            <Practice
              question={question}
              id_quiz={quizId}
              initialCode={verilogAnswers[question.id] || ''}
              onChangeCode={(id_question, code) => {
                setVerilogAnswers((prev) => ({
                  ...prev,
                  [id_question]: code,
                }));
              }}
              disabled={isSubmitted}
            />
          </div>
        );
      }

      return null;
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

          <div className={`w-[90%] flex-wrap gap-12 items-center justify-center sm:justify-end ${isSubmitted ? "hidden" : "flex"}`}>
            <Button onClick={() => {setShowSaveModal(true)}} disabled={isSubmitted} className="bg-white py-3" variant="quaternary" text="Salvar Respostas"/>
            <Button onClick={() => setShowConfirmModal(true)} disabled={isSubmitted} className="bg-white py-3" variant="primary" text="Finalizar Questionário" />
          </div>
        </div>

        {/* Modal de salvamento */}
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

        {/* Modal de confirmação de envio das respostas */}
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