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
import QuestionBox from '@/components/quiz/QuestionBox';

interface Answer {
  answer: string;
  id_question: string;
  value?: number;
  id: string;
  description?: string;
}

export default function Quiz() {
  const { quizId, currentTry } = useParams<{ quizId: string; currentTry: string }>();
  const { user } = useAuth();
  const userId = user?.id.toString() || '';

  // Armazena a tentativa atual do usuário com as questões associadas
  const [UserQuizQuestion, setUserQuizQuestion] = useState<UserQuizQuestionAnswer[]>();

  // Armazena os detalhes das questões do quiz
  const [Questions, setQuestions] = useState<Question[]>();

  // Armazena as alternativas possíveis de múltipla escolha por pergunta
  const [possibleAnswers, setPossibleAnswers] = useState<Record<string, Answer[]>>({});

  const [isLoading, setIsLoading] = useState(true);
  const nome = localStorage.getItem('quizName');

  // Descrição do questionário
  const [quizDesc, setQuizDesc] = useState("Descrição do questionário");

  /* Ajusta o título da página com o nome do quiz */
  useEffect(() => {
    if (!nome) return;
    const originalTitle = document.title;
    document.title = `${originalTitle} - ${nome}`;
    return () => {
      document.title = originalTitle;
    };
  }, [nome]);

  /* Ajusta a descrição do quiz */
  useEffect(() => {
    const desc = localStorage.getItem("quizDesc") || "";
    setQuizDesc(desc);
  }, []);

  /* Carrega as respostas da tentativa específica e as respostas corretas */
  useEffect(() => {
    if (!quizId || !currentTry || !user) return;

    const loadQuizData = async () => {
      try {
        // Busca as respostas da tentativa específica do usuário
        const userQuizArray = await getQuizAnswers(userId, quizId, Number(currentTry));
        setUserQuizQuestion(userQuizArray);

        // Carrega os detalhes de cada pergunta
        const questionIds = userQuizArray.map((item: UserQuizQuestionAnswer) => item.id_question);
        const questionObjects = await fetchQuestion(questionIds);
        setQuestions(questionObjects);

        // Carrega as alternativas de múltipla escolha (que incluem as respostas corretas)
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

        // Para questões de resposta aberta (tipo 2), supomos que a resposta correta esteja em question.correctAnswer
        // Ajuste isso conforme a estrutura real do seu banco de dados
      } catch (error) {
        console.error('Erro ao buscar os dados do quiz:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuizData();
  }, [quizId, currentTry, user]);

  /* Renderiza cada pergunta em seu próprio bloco com feedback */
  const renderQuestions = (questions: Question[]) => {
    return questions.map((question) => {
      // TIPO 0: Conteúdo
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

      // TIPO 1: Múltipla escolha
      if (question.type === 1) {
        const alternativesForThis: Answer[] = possibleAnswers[question.id] || [];
        const userAnswer = UserQuizQuestion?.find((uq) => uq.id_question === question.id);
        const selectedAnswerId = (userAnswer as any)?.id_answer;
        const selectedDescription = alternativesForThis.find((ans) => ans.id === selectedAnswerId)?.description || 'Nenhuma resposta selecionada';

        // Encontrar a resposta correta (assumindo que value === 1 indica a correta)
        const correctAnswer = alternativesForThis.find((ans) => ans.value === 1);
        const isCorrect = correctAnswer && correctAnswer.id === selectedAnswerId;

        return (
          <QuestionBox questionType={1} key={question.id}>
            <div className="flex flex-col gap-6">
              <Paragraph title={question.name} text={question.content} />
              <p>Resposta selecionada: {selectedDescription}</p>
              <p>Status: {isCorrect ? 'Correta' : 'Incorreta'}</p>
              {correctAnswer && <p>Resposta correta: {correctAnswer.description}</p>}
            </div>
          </QuestionBox>
        );
      }

      // TIPO 2: Resposta aberta
      if (question.type === 2) {
        const userAnswer = UserQuizQuestion?.find((uq) => uq.id_question === question.id);
        const textAnswer = (userAnswer as any)?.text_answer || 'Nenhuma resposta fornecida';

        // Supondo que a resposta correta esteja em uma propriedade correctAnswer da questão
        const correctAnswer = (question as any).correctAnswer; // Ajuste conforme a estrutura real
        const isCorrect = correctAnswer && textAnswer === correctAnswer;

        return (
          <QuestionBox questionType={2} key={question.id}>
            <div className="flex flex-col gap-4">
              <Paragraph title={question.name} text={question.content} />
              <p>Resposta: {textAnswer}</p>
              {correctAnswer && (
                <>
                  <p>Status: {isCorrect ? 'Correta' : 'Incorreta'}</p>
                  <p>Resposta correta: {correctAnswer}</p>
                </>
              )}
            </div>
          </QuestionBox>
        );
      }

      // TIPO 3: Verilog
      if (question.type === 3) {
        const userAnswer = UserQuizQuestion?.find((uq) => uq.id_question === question.id);
        const codeAnswer = (userAnswer as any)?.text_answer || '// Nenhuma resposta fornecida';

        // Para Verilog, a avaliação pode ser mais complexa (ex.: testes automatizados)
        // Por enquanto, apenas exibimos a resposta do usuário
        return (
          <div key={question.id} className="w-full mx-auto my-3">
            <Paragraph title={question.name} text={question.content} />
            <pre>{codeAnswer}</pre>
            {/* Adicione feedback aqui se houver lógica de avaliação */}
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
          <div className="col-span-full w-full mb-16 flex flex-col gap-12 mx-auto items-center justify-center">
            {Questions && renderQuestions(Questions)}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}