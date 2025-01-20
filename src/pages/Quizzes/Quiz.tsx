import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Voltar from '@/components/course/Voltar'
import { fetchQuizQuestion } from '@/services/api/quiz'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Question} from '@/interfaces/Quiz'
import Paragraph from '@/components/quiz/Paragraph'
import Description from '@/components/quiz/Description'
import RadioButtonGroup from '@/components/quiz/RadioButtonGroup'

const mockQuestions: Question[] = [
  {  name: 'Question 1', type: 'CONTENT', content: 'Content for question 1,Content for question 1,Content for question 1,Content for question 1,Content for question 1,Content for question 1,Content for question 1,Content for question 1,', responsible: false, id_category: '' },
  {  name: 'Question 2', type: 'CHOICE', content: 'Content for question 2', responsible: false, id_category: '' },
  {  name: 'Question 3', type: 'OPEN', content: 'Content for question 3', responsible: true, id_category: '' },
];

export default function Quiz() {
  const {quizId} = useParams()
  const [Questions, setQuestions] = useState<Question[]>(mockQuestions) //Vai guardar as perguntas do quiz
  const [Answers, setAnswers] = useState<string[]>([]) //Vai guardar as respostas do usuario
  const [description, setDescription] = useState<string>('Essa é a descrição para um questionário de um curso com uma coletânea de questões associadas e etc e tal. seria bom se quebrase a linha k')  //Vai guardar a descrição do quiz
  const [options, setOptions] = useState<string[]>(["opção1","opção2"]) //Vai guardar as opções de resposta
  const question_segment = false
  useEffect(() => {
    if(quizId) {
      const fetchQuestions = async () => {
        const response = await fetchQuizQuestion(quizId)
        //setQuestions(response)
        //setDescription(response.description)
      }
      fetchQuestions()
    }
  }, [])

  /* useEffect(() => {
    document.title = 'NOME DO QUIZ';
  }, []);
  */
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
          <div className="flex mt-5 justify-center">
            <Description text={description} variant={'purple'} />
        </div>
          </div>
          </div>

        <div className="col-span-full flex flex-col gap-24 items-start mx-24 justify-start">
        {Questions.map((question) => {
          switch (question.type) {
            case 'CONTENT':
              return (
                <div className="flex items-start justify-center">
                <Paragraph title={question.name} text={question.content} />
                </div>
              );
            case 'CHOICE':
              return (
                <div>
                  <Paragraph title={question.name} text={question.content} />
                  <RadioButtonGroup values={options}  name={"nome legal"}/>
                    </div>
                );

            case 'OPEN':
                return

            default:
              return null;
          }
        })}

        </div>

      <Footer />
      </div>

  </>
  )
}
