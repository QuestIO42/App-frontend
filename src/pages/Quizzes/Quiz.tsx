import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Voltar from '@/components/course/Voltar'
import { fetchQuizQuestion , fetchQuestion } from '@/services/api/quiz'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Question} from '@/interfaces/Quiz'
import Paragraph from '@/components/quiz/Paragraph'
import Description from '@/components/quiz/Description'
import RadioButtonGroup from '@/components/quiz/RadioButtonGroup'
import QuestionBox from '@/components/quiz/QuestionBox'
import OpenAnswer from '@/components/quiz/OpenAnswer'

const mockQuestions: Question[] = [
  {  name: 'Question 1', type: 0, content: 'Content for question 1,Content for question 1,Content for question 1,Content for question 1,Content for question 1,Content for question 1,Content for question 1,Content for question 1,', responsible: false, id_category: '' },
  {  name: 'Question 2', type: 1, content: 'Content for question 2', responsible: true, id_category: '' },
  {  name: 'Question 3', type: 2, content: 'Content for question 3', responsible: true, id_category: '' },
  {  name: 'Question 4', type: 0, content: 'Content for question 1,Content for question 1,Content for question 1,Content for question 1,Content for question 1,Content for question 1,Content for question 1,Content for question 1,', responsible: false, id_category: '' },];

export default function Quiz() {
  const {quizId} = useParams()

  const [Questions, setQuestions] = useState<Question[]>(mockQuestions) //Vai guardar as perguntas do quiz
  const [Answers, setAnswers] = useState<string[]>([]) //Vai guardar as respostas do usuario
  const [description, setDescription] = useState<string>('Essa é a descrição para um questionário de um curso com uma coletânea de questões associadas e etc e tal. seria bom se quebrase a linha k')  //Vai guardar a descrição do quiz
  const [options, setOptions] = useState<string[]>(["opção1","opção2"]) //Vai guardar as opções de resposta

  useEffect(() => {
    const name = localStorage.getItem('quizName');
    const originalTitle = document.title;
    if (name) {
      document.title = `${document.title} - ${name}`;
    }
    return () => {
      document.title = originalTitle;
  };
  }, []);

  useEffect(() => {
    if (quizId) {
      const fetchQuestions = async () => {
        try {
          const response = await fetchQuizQuestion(quizId);
          console.log("resposta:", response)
          const questionIds = response.map((question:any) => question.id_question);
          console.log("questionIds", questionIds)
          const questions = await fetchQuestion(questionIds);
          console.log("A questão é essa:", questions)
          //setQuestions(questions);
          //setDescription(response.description);
        } catch (error) {
          console.error('Erro ao buscar as questões:', error);
        }
      };
      fetchQuestions();
    }
  }, [quizId]);



const groupQuestions = (Questions: Question[]) => {
  return (
    <QuestionBox>
      {Questions.map((question, index) => (
        <div key={index} className="flex items-start">
          {JSON.stringify(question.type) === '1' && (
            <>
            <div className="flex flex-col gap-4">
              <Paragraph title={question.name} text={question.content} />
              <RadioButtonGroup
                values={question.content.split(',')}
                name={`question-${question.name}`}
              />
              </div>
            </>
          )}
          {JSON.stringify(question.type) === '2' && (
            <div className="flex flex-col gap-4 w-full">
            <Paragraph title={question.name} text={question.content} />
            <OpenAnswer/>
            </div>
          )}
        </div>
      ))}
    </QuestionBox>
  );
}

const renderQuestions = (questions: Question[]) => {
  const groups: JSX.Element[] = [];
  let currentGroup: Question[] = [];

  questions.forEach((question) => {
    if (JSON.stringify(question.type) === '1' || question.type=== 1 || JSON.stringify(question.type) === '2' || question.type === 2) {
      currentGroup.push(question);
    } else {
      if (currentGroup.length > 0) {
        const result =(groupQuestions(currentGroup));
        groups.push(result);
        currentGroup = [];
      }
      switch (JSON.stringify(question.type)) {
        case '0':
          groups.push(
            <Paragraph title={question.name} text={question.content} />
          );
          break;
        default:
          break;
      }
    }
  }); // Fechamento corrigido do forEach

  if (currentGroup.length > 0) {
    const result = groupQuestions(currentGroup);
    groups.push(result);
  }
  return groups;
};

    return(
  <>
    <div className="grid min-h-screen w-screen grid-cols-4 grid-rows-[auto,1fr,auto] gap-6 bg-grid-pattern">
      <Header />
      <div className="col-span-full flex justify-between">
        <div className="w-30 flex flex-col justify-start">
          <div className="w-30 ml-6">
            <Voltar></Voltar>
          </div>
        </div>
        </div>

        <div className="col-span-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-[#454545]">NOME DO QUIZ</h1>
          <div className="flex mt-5 mb-20 justify-center">
            <Description text={description} variant={'purple'} />
        </div>
          </div>
          </div>

        <div className="col-span-full flex flex-col gap-24 items-start mx-24 justify-start">
          {renderQuestions(Questions)} {/* Essa função retorna um elemento JSX contendo todas
                                           As questões corretamente mapeadas e renderizadas */}

        </div>

      <Footer />
      </div>

  </>
  )
}
