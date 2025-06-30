import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Voltar from '@/components/course/Voltar';

import { fetchQuestion } from '@/services/api/quiz';
import { getQuizAnswers, getAllAnswers } from '@/services/api/answer';

import { useAuth } from '@/hooks/useAuth';
import { Question, UserQuizQuestionAnswer } from '@/interfaces/Quiz';
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

export default function QuizView() {
  const { quizId, currentTry } = useParams<{ quizId: string; currentTry: string }>();
  const { user } = useAuth();
  const userId = user?.id.toString() || '';

  const [UserQuizQuestion, setUserQuizQuestion] = useState<UserQuizQuestionAnswer[]>();
  const [userQuizMap, setUserQuizMap] = useState<Record<string, string>>({});
  const [Questions, setQuestions] = useState<Question[]>();
  const [UserAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [possibleAnswers, setPossibleAnswers] = useState<Record<string, Answer[]>>({});
  const [verilogAnswers, setVerilogAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  const nome = localStorage.getItem('quizName');
  const [quizDesc, setQuizDesc] = useState("Descrição do questionário");

  // Ajusta o título da página com o nome do quiz
  useEffect(() => {
    if (!nome) return;
    const originalTitle = document.title;
    document.title = `${originalTitle} - ${nome}`;
    return () => {
      document.title = originalTitle;
    };
  }, [nome]);

  // Ajusta a descrição do quiz
  useEffect(() => {
    const desc = localStorage.getItem("quizDesc") || "";
    setQuizDesc(desc);
  }, []);

  // Carrega as respostas do quiz com currentTry, sem criar novas tentativas
  useEffect(() => {
    if (!quizId || !user || !currentTry) return;

    const loadQuizAnswers = async () => {
      try {
        // Busca respostas da tentativa atual
        const userQuizArray = await getQuizAnswers(userId, quizId, Number(currentTry));
        setUserQuizQuestion(userQuizArray);

        // Carrega detalhes das perguntas
        const questionIds = userQuizArray.map((item: UserQuizQuestionAnswer) => item.id_question);
        const questionObjects = await fetchQuestion(questionIds);
        setQuestions(questionObjects);

        // Carrega alternativas de múltipla escolha
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

        // Mapeia as respostas do usuário para visualização
        const existingAnswers: UserAnswer[] = userQuizArray
          .map((item: UserQuizQuestionAnswer) => {
            if (item.id_answer) {
              const chosenId = item.id_answer;
              const alternativas = map[item.id_question] || [];
              const chosenObj = alternativas.find(ans => ans.id === chosenId);
              return {
                id_question: item.id_question,
                answer: chosenId,
                value: chosenObj ? chosenObj.value : 0,
                type: 1,
              };
            }
            if (item.text_answer) {
              return {
                id_question: item.id_question,
                answer: item.text_answer,
                value: 0,
                type: 2,
              };
            }
            return null;
          })
          .filter((x: UserAnswer | null): x is UserAnswer => x !== null);

        setUserAnswers(existingAnswers);

        // Carrega código salvo para questões Verilog
        const initialVerilog: Record<string,string> = {};
        questionObjects.forEach((question) => {
          if (question.type === 3) {
            const found = userQuizArray.find((item: UserQuizQuestionAnswer) => item.id_question === question.id);
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

    loadQuizAnswers();
  }, [quizId, user, currentTry, userId]);

  // Mapeia id_question → id do UserQuizQuestionAnswer
  useEffect(() => {
    if (!UserQuizQuestion) return;
    const map: Record<string, string> = {};
    UserQuizQuestion.forEach((item) => {
      map[item.id_question] = item.id;
    });
    setUserQuizMap(map);
  }, [UserQuizQuestion]);

  // Renderiza perguntas com respostas em modo somente leitura
  const renderQuestions = (questions: Question[]) => {
    return questions.map((question) => {
      const userAnswerForThis = UserAnswers.find(ans => ans.id_question === question.id);
      const alternativesForThis: Answer[] = possibleAnswers[question.id] || [];

      // Conteúdo (tipo 0)
      if (question.type === 0) {
        return (
          <div className="w-[90%] my-3" key={question.id}>
            <div className="w-fit flex self-start justify-center px-8 py-2 mb-6 font-bold bg-[#DDDDDD] shadow-default-cinza text-[#777]">
              <p className="text-left text-2xl">Conteúdo</p>
            </div>
            <div className="flex mx-auto items-start px-10 py-12 border-2 border-[#a8a8a8] bg-white">
              <Paragraph title={question.name} text={question.content} />
            </div>
          </div>
        );
      }

      // Múltipla escolha (tipo 1)
      if (question.type === 1) {
        const selectedDescription =
          alternativesForThis.find((ans) => ans.id === userAnswerForThis?.answer)?.description || '';

        return (
          <QuestionBox questionType={1} key={question.id}>
            <div className="flex flex-col gap-6">
              <Paragraph title={question.name} text={question.content} />
              <RadioButtonGroup
                initialValue={selectedDescription}
                handleAnswer={() => {}}
                values={alternativesForThis.map((ans) => ans.description ?? '')}
                name={`question-${question.id}`}
                verified={true}
                correct={true}
                verifiedValue={selectedDescription}
                disabled={true}
              />
            </div>
          </QuestionBox>
        );
      }

      // Resposta aberta (tipo 2)
      if (question.type === 2) {
        const initialText = userAnswerForThis?.answer || '';

        return (
          <QuestionBox questionType={2} key={question.id}>
            <div className="flex flex-col gap-4">
              <Paragraph title={question.name} text={question.content} />
              <OpenAnswer
                id_question={question.id}
                initialValue={initialText}
                handleAnswer={() => {}}
                verified={true}
                correct={true}
                disabled={true}
              />
            </div>
          </QuestionBox>
        );
      }

      // Verilog (tipo 3)
      if (question.type === 3) {
        return (
          <div key={question.id} className="w-full mx-auto my-3">
            <Practice
              question={question}
              id_quiz={quizId}
              initialCode={verilogAnswers[question.id] || ''}
              onChangeCode={() => {}}
              disabled={true} // só leitura
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
              <Description text={quizDesc} variant={'purple'} />
            </div>
          </div>
        </div>

        <div className="col-span-full w-full mb-16 flex flex-col gap-12 mx-auto items-center justify-center">
          {Questions && renderQuestions(Questions)}
        </div>

        <Footer />
      </div>
    </>
  );
}
