import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Voltar from '@/components/course/Voltar';

import { fetchQuizQuestion } from '@/services/api/quiz';
import { getAllAnswers } from '@/services/api/answer';
import { getUserAnswer, postUserAnswer, putUserAnswer } from '@/services/api/userAnswer';

import { useAuth } from '@/hooks/useAuth';
import { Question } from '@/interfaces/Quiz';
import Paragraph from '@/components/quiz/Paragraph';
import Description from '@/components/quiz/Description';
import RadioButtonGroup from '@/components/quiz/RadioButtonGroup';
import QuestionBox from '@/components/quiz/QuestionBox';
import OpenAnswer from '@/components/quiz/OpenAnswer';
import Practice from '@/components/verilogIDE/Practice';

interface Answer {
  id: string;
  id_question: string;
  description: string;
  answer?: string;
  value: number;
}

interface UserAnswer {
  id_user_answer_instance?: string;
  id_question: string;
  answer: string;
  value: number;
  correct: boolean;
  type: number; // Adiciona o tipo de questão
  resultStatus?: "right" | "wrong" | "partial";
  feedback?: string;
}

export default function Quiz() {
  const { user } = useAuth();
  const userId = user?.id.toString() || '';
  const { quizId } = useParams();
  const [Questions, setQuestions] = useState<Question[]>();
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
  // Log para verificar se quizId está presente no início
  // console.log(`useEffect - Iniciando busca. quizId: ${quizId}`);

  if (quizId) {
    const fetchQuizContent = async () => {
      setIsLoading(true);
      try {
        // 1. Buscar as questões do quiz
        const questionsResponse = await fetchQuizQuestion(quizId);
        // console.log("useEffect - Resposta de fetchQuizQuestion:", questionsResponse);
        // Garante que questionsResponse seja um array; se for null/undefined, usa array vazio.
        setQuestions(Array.isArray(questionsResponse) ? questionsResponse : []);

        // Prossegue somente se questionsResponse for um array e tiver itens
        if (Array.isArray(questionsResponse) && questionsResponse.length > 0) {
          const questionIds = questionsResponse.map((question: Question) => question.id);
          // console.log("useEffect - IDs das Questões para buscar alternativas:", questionIds);

          // 2. Buscar todas as opções de resposta para essas questões
          const possibleAnswersResponse = await getAllAnswers(questionIds);
          // console.log("useEffect - Resposta de getAllAnswers (PossibleAnswers cru):", possibleAnswersResponse);
          // Garante que possibleAnswersResponse seja um array; se for null/undefined, usa array vazio.
          setAnswers(Array.isArray(possibleAnswersResponse) ? possibleAnswersResponse : []);

          // 3. Buscar as respostas que o usuário já deu para este quiz
          const userAnswersFromAPI: any[] = await getUserAnswer(quizId);
          // console.log("useEffect - Resposta de getUserAnswer (UserAnswers cru da API):", userAnswersFromAPI);

          // 4. Formatar as respostas do usuário para o estado local
          // Garante que userAnswersFromAPI seja um array antes de mapear
          const formattedUserAnswers = (Array.isArray(userAnswersFromAPI) ? userAnswersFromAPI : []).map((apiUA: any) => {
            const question = questionsResponse.find((q: Question) => q.id === apiUA.id_question);
            let localAnswerContent = '';
            if (question) {
              if (question.type === 1) { // Múltipla escolha
                localAnswerContent = apiUA.id_answer || '';
              } else if (question.type === 2) { // Aberta
                localAnswerContent = apiUA.text_answer || '';
              }
            }
            const scoreFromAPI = apiUA.score ? parseFloat(apiUA.score) : 0;
            let correctFromAPI = false;
            if (apiUA.result === "right") correctFromAPI = true;

            return {
              id_user_answer_instance: apiUA.id,
              id_question: apiUA.id_question,
              answer: localAnswerContent,
              value: scoreFromAPI,
              correct: correctFromAPI,
              type: question ? question.type : 0,
              resultStatus: apiUA.result as UserAnswer['resultStatus'],
              feedback: apiUA.feedback,
            };
          });
          setUserAnswers(formattedUserAnswers);
          // console.log("useEffect - UserAnswers formatados para o estado:", formattedUserAnswers);

          // Lógica para pré-popular estados de UI com base nas respostas carregadas
          // (Mantida da versão anterior, pois depende de formattedUserAnswers)
          const initialDisabled: Record<string, boolean> = {};
          const initialVerified: Record<string, string> = {};
          let questionsToUpdateVerifiedStatus: Question[] = [];
          formattedUserAnswers.forEach(ua => {
            if (ua.id_user_answer_instance && ua.resultStatus) { // Se já veio do backend e foi avaliada
              initialDisabled[ua.id_question] = true;
              initialVerified[ua.id_question] = ua.answer;
              const qToUpdate = questionsResponse.find((q: Question) => q.id === ua.id_question);
                if (qToUpdate) questionsToUpdateVerifiedStatus.push(qToUpdate);
            }
          });
          setDisabledQuestions(initialDisabled);
          setVerifiedValues(initialVerified);
           if (questionsToUpdateVerifiedStatus.length > 0) {
                setQuestions(prevQs => (prevQs || []).map(q => questionsToUpdateVerifiedStatus.find(updatedQ => updatedQ.id === q.id) ? {...q, verified: true} : q));
            }


        } else {
          // Se não houver questões (questionsResponse é vazio ou inválido)
          // console.log("useEffect - Nenhuma questão encontrada, limpando estados dependentes.");
          setAnswers([]);
          setUserAnswers([]);
          // setQuestions já foi definido como [] acima se questionsResponse não for um array
        }

      } catch (error) {
        console.error('useEffect - Erro ao buscar os dados do quiz:', error);
        // Em caso de erro, define todos os estados como vazios para evitar erros de renderização
        setQuestions([]);
        setAnswers([]);
        setUserAnswers([]);
      }
      finally {
        setIsLoading(false);
        // console.log("useEffect - Busca de dados finalizada, isLoading: false");
      }
    };
    fetchQuizContent();
  } else {
    // console.log("useEffect - quizId está faltando, limpando estados.");
    // Caso não haja quizId, reseta os estados e para de carregar
    setQuestions([]);
    setAnswers([]);
    setUserAnswers([]);
    setIsLoading(false);
  }
}, [quizId]); // Dependência principal é quizId

  if (isLoading) {
    // Show a loading spinner or placeholder while fetching
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Atualiza ou adiciona a resposta do usuário para uma pergunta
  const handleAnswer = (id_question: string, answerIdOrText: string, score: number, type: number) => {
    setUserAnswers((prevAnswers: UserAnswer[]): UserAnswer[] => { // Tipagem explícita para clareza
      const existingAnswerIndex = prevAnswers.findIndex(ans => ans.id_question === id_question);

      if (existingAnswerIndex !== -1) {
        // Resposta já existe, atualiza-a
        const existingAnswer = prevAnswers[existingAnswerIndex];
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          ...existingAnswer,
          answer: answerIdOrText,
          value: score,
          type: type,
          correct: false,
          resultStatus: undefined,
          feedback: undefined,
        };
        console.log("Resposta atualizada:", updatedAnswers[existingAnswerIndex]);
        return updatedAnswers;
      } else {
        // Resposta não existe, adiciona uma nova
        const newAnswer: UserAnswer = { // Criando o objeto com todas as propriedades da interface
          id_question,
          answer: answerIdOrText,
          value: score,
          correct: false,
          type: type,
          id_user_answer_instance: undefined, // Explicitamente undefined
          resultStatus: undefined,          // Explicitamente undefined
          feedback: undefined,              // Explicitamente undefined
        };
        console.log("Nova resposta adicionada:", newAnswer);
        return [...prevAnswers, newAnswer];
      }
    });
  };

  // Envia todas as respostas do usuário para a API
  async function publishAnswers() {
    if (!quizId) {
      console.error("Quiz ID é indefinido. Não é possível publicar respostas.");
      alert("Erro: ID do Quiz não encontrado. Não foi possível enviar as respostas.");
      return;
    }
    if (!userId) {
      console.error("User ID é indefinido. Não é possível publicar respostas.");
      alert("Erro: Usuário não identificado. Não foi possível enviar as respostas.");
      return;
    }

    let allRequestsSuccessful = true;

    const answersToPublish = UserAnswers.filter(
      ua => disabledQuestions[ua.id_question] && ua.answer.trim() !== ''
    );

    if (answersToPublish.length === 0) {
      console.log("Nenhuma resposta para publicar.");
      return;
    }

    // console.log("Respostas a serem publicadas:", answersToPublish);

    for (const userAnswer of answersToPublish) {
      try {
        let backendResponse: any;

        const answerPayloadPart = {
          id_answer: userAnswer.type === 1 ? userAnswer.answer : "",
          text_answer: userAnswer.type === 2 ? userAnswer.answer : "",
        }

        if (userAnswer.id_user_answer_instance) {
          backendResponse = putUserAnswer(
            userAnswer.id_user_answer_instance,
            answerPayloadPart
          );
        } else {
          const createPayload = {
            id_user: userId,
            id_quiz: quizId,
            id_question : userAnswer.id_question,
            ...answerPayloadPart,
          };
          backendResponse = await postUserAnswer(createPayload);
        }
        if (backendResponse && backendResponse.id) {
          const backendInstanceId = backendResponse.id;
          // backendResponse.score é uma string, converter para número
          const backendScore = backendResponse.score ? parseFloat(backendResponse.score) : 0;
          const backendResultStatus = backendResponse.result as UserAnswer['resultStatus']; // "right", "wrong", "partial"
          const backendFeedback = backendResponse.feedback;

          let isCorrectAfterBackend = false;
          if (backendResultStatus === "right") {
            isCorrectAfterBackend = true;
          }
          // Para "partial", decidimos que 'correct' continua false por padrão (ou ajuste conforme sua regra de negócio)

          setUserAnswers(prevUserAnswers =>
            prevUserAnswers.map(ua => {
              if (ua.id_question === userAnswer.id_question) {
                return {
                  ...ua,
                  id_user_answer_instance: backendInstanceId, // Atualiza ou define o ID da instância
                  value: backendScore,                        // Usa a pontuação do backend
                  correct: isCorrectAfterBackend,             // Usa a correção baseada no 'result' do backend
                  resultStatus: backendResultStatus,          // Armazena o status "right", "wrong", "partial"
                  feedback: backendFeedback || "",            // Armazena o feedback (ou limpa se não houver)
                };
              }
              return ua;
            })
          );
        } else {
          console.error(`Resposta do backend inválida ou sem ID para questão: ${userAnswer.id_question}`, backendResponse);
          allRequestsSuccessful = false;
        }
         
      } catch (error) {
        console.error("Erro ao publicar resposta:", error);
        allRequestsSuccessful = false;
      }
    }

    // Feedback geral ao final do processo de publicação
    if (answersToPublish.length > 0) { // Somente mostra alerta se tentou publicar algo
        if (allRequestsSuccessful) {
            alert("Respostas verificadas foram enviadas e processadas pelo servidor!");
        } else {
            alert("Algumas respostas não puderam ser enviadas ou foram processadas incorretamente. Verifique o console para mais detalhes.");
        }
      }
    }

  // Verifica se as respostas do usuário estão corretas e atualiza o estado
  function checkAnswers(questionsToCheck: Question[]) {
    // 1. Marcar as questões como desabilitadas para este grupo
    const newDisabledState = { ...disabledQuestions };
    questionsToCheck.forEach(q => {
      newDisabledState[q.id] = true;
    });
    setDisabledQuestions(newDisabledState);

    // 2. Avaliar localmente as respostas e atualizar UserAnswers
    const updatedUserAnswers = UserAnswers.map(userAnswer => {
      // Processar apenas as respostas que pertencem ao grupo de 'questionsToCheck'
      if (!questionsToCheck.some(q => q.id === userAnswer.id_question)) {
        return userAnswer; // Retorna a resposta inalterada se não for do grupo atual
      }

      const question = Questions?.find(q => q.id === userAnswer.id_question);
      // Encontra as opções/respostas corretas para esta questão em PossibleAnswers
      const questionOptionsAndCorrectAnswers = Answers.find(
        ansArray => ansArray.length > 0 && ansArray[0]?.id_question === userAnswer.id_question
      ) || [];

      let localIsCorrect = false;
      let localNewScore = 0; // Score padrão se não houver acerto ou opção

      if (question && questionOptionsAndCorrectAnswers.length > 0) {
        if (question.type === 1) { // Múltipla escolha
          // userAnswer.answer contém o ID da opção selecionada
          const selectedOption = questionOptionsAndCorrectAnswers.find(opt => opt.id === userAnswer.answer);
          if (selectedOption) {
            localIsCorrect = selectedOption.value > 0; // Ex: pontuação > 0 indica opção correta
            localNewScore = selectedOption.value;
          }
        } else if (question.type === 2) { // Questão de resposta aberta
          // userAnswer.answer contém o texto da resposta do usuário
          // PossibleAnswers para tipo 2 deve ter um campo 'answer' com o texto correto
          const matchingCorrectAnswer = questionOptionsAndCorrectAnswers.find(
            opt => opt.answer && opt.answer.trim().toLowerCase() === userAnswer.answer.trim().toLowerCase()
          );
          if (matchingCorrectAnswer) {
            localIsCorrect = true;
            localNewScore = matchingCorrectAnswer.value; // Pega a pontuação da resposta correta
          }
        }
      }

      // Retorna a UserAnswer atualizada com a avaliação LOCAL
      // e reseta resultStatus e feedback para aguardar a resposta do backend
      return {
        ...userAnswer,
        correct: localIsCorrect,
        value: localNewScore,
        resultStatus: undefined, // Limpa status anterior
        feedback: undefined,     // Limpa feedback anterior
      };
    });
    setUserAnswers(updatedUserAnswers);

    // 3. Atualizar 'verifiedValues' para a UI e marcar questões como 'verified' no estado Questions (imutável)
    setVerifiedValues(prevVerified => {
      const nextVerified = { ...prevVerified };
      questionsToCheck.forEach(questionInBox => {
        const uAnswer = updatedUserAnswers.find(ans => ans.id_question === questionInBox.id);
        if (uAnswer) {
          nextVerified[questionInBox.id] = uAnswer.answer; // Armazena o ID da opção ou o texto
        }
      });
      return nextVerified;
    });

    setQuestions(prevQuestions =>
      (prevQuestions || []).map(q => {
        if (questionsToCheck.some(qtc => qtc.id === q.id)) {
          return { ...q, verified: true }; // Marca a questão original como verificada
        }
        return q;
      })
    );

    // 4. Chamar publishAnswers para enviar ao backend
    // publishAnswers usará os UserAnswers atualizados (com correct/value locais)
    // e depois atualizará UserAnswers novamente com a resposta do backend.
    publishAnswers();
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
          const answerOptionsForQuestion = Answers.find(arr => arr[0]?.id_question === question.id) || [];
          const currentUserAnswer = UserAnswers.find(ua => ua.id_question === question.id);
          return (
            <div key={`question-${question.id}`} className="flex items-start">
              {question.type === 1 && (
                <>
                  <div className="flex flex-col gap-4">
                    <Paragraph title={question.name} text={question.content} />
                    <RadioButtonGroup
                      // 1. Corrigir a prop 'options'
                      options={answerOptionsForQuestion.map(opt => ({ id: opt.id, label: opt.description }))}
                      name={`question-${question.id}`}
                      
                      // 2. Corrigir a callback 'handleAnswer' (agora chamada 'onValueChange' no exemplo que dei para RadioButtonGroup,
                      //    ou mantenha 'handleAnswer' no RadioButtonGroup e ajuste sua assinatura)
                      //    Vou assumir que a prop no RadioButtonGroup.tsx é 'handleAnswer' e espera (optionId: string)
                      handleAnswer={(optionId: string) => { // Esta callback agora recebe o ID da opção
                        const selectedOpt = answerOptionsForQuestion.find(opt => opt.id === optionId);
                        // Chama a handleAnswer principal do Quiz.tsx com o ID da opção, o valor/score da opção e o tipo da questão
                        handleAnswer(question.id, optionId, selectedOpt?.value || 0, question.type);
                      }}
                      
                      verified={question.verified} // Se a questão/grupo foi verificada
                      
                      // 3. Corrigir prop para feedback de acerto da opção selecionada
                      correctDisplayForSelected={currentUserAnswer?.correct}
                      
                      // 4. Corrigir prop para valor selecionado (deve ser o ID)
                      selectedValueProp={currentUserAnswer?.answer} // currentUserAnswer.answer agora é o ID da opção
                      
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
          {renderQuestions(Questions || [])}
        </div>

        <Footer/>
      </div>
    </>
  );
}
