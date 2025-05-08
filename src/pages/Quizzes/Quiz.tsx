import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Voltar from '@/components/course/Voltar';

import { fetchQuizQuestion } from '@/services/api/quiz';
import { getAllAnswers } from '@/services/api/answer';
import { getUserAnswer, postUserAnswer } from '@/services/api/userAnswer';

import { useAuth } from '@/hooks/useAuth';
import { Question } from '@/interfaces/Quiz';
import Paragraph from '@/components/quiz/Paragraph';
import Description from '@/components/quiz/Description';
import RadioButtonGroup from '@/components/quiz/RadioButtonGroup';
import QuestionBox from '@/components/quiz/QuestionBox';
import OpenAnswer from '@/components/quiz/OpenAnswer';
import Practice from '@/components/verilogIDE/Practice';

const mockQuestions: Question[] = [
  { name: 'Question 1', type: 0, content: 'Content for question 1', responsible: false, id_category: '', id: '1', verified: false },
  { name: 'Question 2', type: 1, content: 'Content for question 2', responsible: true, id_category: '', id: '2', verified: false },
  { name: 'Question 3', type: 2, content: 'Content for question 3', responsible: true, id_category: '', id: '3', verified: false },
  { name: 'Question 4', type: 0, content: 'Content for question 4', responsible: false, id_category: '', id: '4', verified: false },
];

interface Answer {
  answer: string;
  id_question: string;
  value: number;
  id: string;
  description: string;
}

interface UserAnswer {
  id_question: string;
  answer: string;
  value: number;
  correct: boolean;
  type: number; // Adiciona o tipo de questão
}

export default function Quiz() {
  const { user } = useAuth();
  const userId = user?.id.toString() || '';
  const { quizId } = useParams();
  const [Questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [Answers, setAnswers] = useState<Answer[][]>([]);
  const [UserAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [verifiedValues, setVerifiedValues] = useState<Record<string, string>>({});
  const [description] = useState<string>('Essa é a descrição para um questionário de um curso com uma coletânea de questões associadas e etc e tal. seria bom se quebrase a linha k');
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const nome = localStorage.getItem('quizName');

  // marca quais questões já foram verificadas e estão desativadas
  const [disabledQuestions, setDisabledQuestions] = useState<Record<string, boolean>>({});

  // Altera o título da aba do navegador com o nome do quiz, se disponível
  useEffect(() => {
    if (!nome) return;

    const originalTitle = document.title;
    document.title = `${originalTitle} - ${nome}`;

    return () => {
      document.title = originalTitle;
    };
  }, [nome]);

  // Busca as questões e respostas do quiz a partir do ID na URL
  useEffect(() => {
    if (quizId) {
      const fetchQuestions = async () => {
        try {
          const response = await fetchQuizQuestion(quizId);
          console.log("resposta:", response);

          const questionIds = response.map((question: any) => question.id);
          console.log("questionIds", questionIds);

          const answers = await getAllAnswers(questionIds);
          console.log("as respostas são essas:", answers);

          // const userAnswers = await getUserAnswer(userId);

          setQuestions(response);
          setAnswers(answers);

        } catch (error) {
          console.error('Erro ao buscar as questões:', error);
        }
        finally {
          setIsLoading(false);
        }
      };
      fetchQuestions();
    }
  }, [quizId]);

  if (isLoading) {
    // Show a loading spinner or placeholder while fetching
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Atualiza ou adiciona a resposta do usuário para uma pergunta
  const handleAnswer = (id_question: string, answer: string, score: number, type: number) => {
    setUserAnswers(prevAnswers => {
      // Verifica se já existe uma resposta para esta pergunta
      const existingAnswerIndex = prevAnswers.findIndex(ans => ans.id_question === id_question);

      // Se existir, atualiza o valor
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { ...updatedAnswers[existingAnswerIndex], answer: answer, value: score, type: type };
        return updatedAnswers;
      }
      // Se não existir, adiciona uma nova resposta
      return [...prevAnswers, { id_question, answer: answer, value: score, correct: false, type: type }];
    });
  };

  // Envia todas as respostas do usuário para a API
  function publishAnswers() {
    UserAnswers.forEach(userAnswer => {
      postUserAnswer(userId, quizId || '', userAnswer.id_question, Answers[1][0].id, userAnswer.answer, userAnswer.value);
    }
    );
  }

  // Verifica se as respostas do usuário estão corretas e atualiza o estado
  function checkAnswers(questionsToCheck: Question[]) {
    console.log("Respostas", Answers);

    const newDisabled = { ...disabledQuestions };
    questionsToCheck.forEach(q => {
      newDisabled[q.id] = true;
    });
    setDisabledQuestions(newDisabled);

    const updatedUserAnswers = UserAnswers.map(userAnswer => {
      const questionAnswers = Answers.find(ans => ans[0]?.id_question === userAnswer.id_question);
      if (questionAnswers && questionsToCheck.some(q => q.id === userAnswer.id_question)) {
        if (userAnswer.type === 1) { // Questão de alternativa
          userAnswer.correct = userAnswer.value > 0;
        } else if (userAnswer.type === 2) { // Questão de resposta aberta
          userAnswer.correct = questionAnswers.some(ans => ans && ans.description && ans.description.trim().toLowerCase() === userAnswer.answer.trim().toLowerCase());
          if (userAnswer.correct) {
            userAnswer.value = questionAnswers.find(ans => ans.description.trim().toLowerCase() === userAnswer.answer.trim().toLowerCase())?.value || 0;
          }
        }
      }
      return userAnswer;
    });

    setUserAnswers(updatedUserAnswers);
    console.log("teste respostas", updatedUserAnswers);

    setVerifiedValues(prev => {
      const next = { ...prev };
      questionsToCheck.forEach(question => {
        const updatedAnswer = updatedUserAnswers.find(ans => ans.id_question === question.id);
        if (updatedAnswer) {
          next[question.id] = updatedAnswer.answer;
          question.verified = true;
        }
      });
      return next;
    });
    publishAnswers();

    // Enviar respostas para o back
    // postUserAnswer(userId, quizId || '', 1, 1);
  }

  // Agrupa perguntas de múltipla escolha ou dissertativas em um "QuestionBox"
  const groupQuestions = (Questions: Question[], boxIndex: number) => {
    // verifica se o usuário respondeu alguma questão deste grupo
    const hasAnyAnswer = Questions.some(q => {
      const ua = UserAnswers.find(ans => ans.id_question === q.id);
      return ua !== undefined && ua.answer.trim() !== '';
    });

    // desabilita se já foi verificado ou se não há nenhuma resposta
    const isVerifyDisabled = Questions.every(q => disabledQuestions[q.id]) || !hasAnyAnswer;

    return (

      <QuestionBox 
        handlePrint={() => checkAnswers(Questions)}
        disabled={isVerifyDisabled}
        key={`question-box-${boxIndex}`}>
        {Questions.map((question) => {
          // Encontre as respostas corretas para a pergunta atual
          const answerArray = Answers.find(ans => ans[0]?.id_question === question.id) || [];
          const descriptions = answerArray.map(item => item.description);

          return (
            <div key={`question-${question.id}`} className="flex items-start">
              {question.type === 1 && (
                <>
                  <div className="flex flex-col gap-4">
                    <Paragraph title={question.name} text={question.content} />
                    <RadioButtonGroup
                      handleAnswer={(value: string) => handleAnswer(question.id, value, answerArray.find(ans => ans.description === value)?.value || 0, question.type)} // Pass function to handle answer
                      values={descriptions} // Pass answer values
                      name={`question-${question.id}`} // Use question.id for unique name
                      verified={question.verified}
                      correct={!!UserAnswers.find(ua => ua.id_question === question.id && ua.correct)}
                      verifiedValue={verifiedValues[question.id]}
                      disabled={!!disabledQuestions[question.id]}
                    />


                  </div>
                </>
              )}
              {question.type === 2 && (
                <div className="flex flex-col gap-4 w-full">
                  <Paragraph title={question.name} text={question.content} />
                  <OpenAnswer
                    id_question={question.id}
                    handleAnswer={(value: string) => handleAnswer(question.id, value, 0, question.type)}
                    verified={question.verified}
                    correct={UserAnswers.find(userAnswer => question.id === userAnswer.id_question && userAnswer.correct) ? true : false}
                    disabled={!!disabledQuestions[question.id]}
                  />
                </div>
              )}
            </div>
          );
        })}
      </QuestionBox>
    );
  };

  // Organiza todas as perguntas e renderiza conforme o tipo (texto, múltipla escolha, aberta, código)
  const renderQuestions = (questions: Question[]) => {
    const groups: JSX.Element[] = [];
    let currentGroup: Question[] = [];
    let boxIndex = 0;

    questions.forEach((question, index) => {
      if (question.type === 1 || question.type === 2) {
        currentGroup.push(question);
      } else {
        if (currentGroup.length > 0) {
          const result = groupQuestions(currentGroup, boxIndex);
          groups.push(result);
          currentGroup = [];
          boxIndex++;
        }
        switch (question.type) {
          // Conteúdo
          case 0:
            groups.push(
              <div className='w-[90%] mx-auto'>
                <Paragraph key={question.name + "-" + index} title={question.name} text={question.content} />
              </div>
            );
            break;
          // Exercícios de código em Verilog
          case 3:
            groups.push(
              <Practice key={question.name + "-" + index} question={question} id_quiz={quizId}/>
            );
            break;
          default:
            break;
        }
      }
    });

    if (currentGroup.length > 0) {
      const result = groupQuestions(currentGroup, boxIndex);
      groups.push(result);
    }
    return groups;
  };

  return (
    <>
      <div className="grid min-h-screen w-full overflow-x-hidden grid-cols-4 grid-rows-[auto,1fr,auto] gap-6 bg-grid-pattern">
        <Header/>

        <div className=" flex flex-col col-span-full flex justify-start gap-4">
          <div className="w-30 justify-start">
            <div className="ml-10 md:ml-20 mt-10">
              <Voltar/>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-[#454545]">{nome}</h1>
            <div className="flex mt-5 mb-16 px-10 justify-center">
              <Description text={description} variant={'purple'}/>
            </div>
          </div>
        </div>

        <div className="col-span-full w-full mb-16 flex flex-col gap-24 mx-auto items-center justify-center">
          {renderQuestions(Questions)}
        </div>

        <Footer/>
      </div>
    </>
  );
}
