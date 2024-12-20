import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Voltar from '@/components/course/Voltar'
import { fetchQuizQuestion } from '@/services/api/quiz'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Question} from '@/interfaces/Quiz'
import Paragraph from '@/components/quiz/Paragraph'



export default function Quiz() {
  const {quizId} = useParams()
  const [Questions, setQuestions] = useState<Question[]>([])
  const [Answers, setAnswers] = useState<string[]>([]) //Vai guardar as respostas do usuario
  useEffect(() => {
    if(quizId) {
      const fetchQuestions = async () => {
        const response = await fetchQuizQuestion(quizId)
        setQuestions(response)
      }
      fetchQuestions()
    }
  }, [])
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
      <div className="col-span-full flex items-start justify-center">
          <div className=" flex items-start justify-center">
           <p>NOME DO QUIZ</p>
          </div>
      </div>

        {Questions.map((question) => {
          switch (question.type) {
            case 'CONTENT':
              return (
                <Paragraph title={question.name} text={question.content} />
              );
            case 'CHOICE':
              return (
                <div>
                  <h1>{question.name}</h1>
                    </div>
                );

            case 'OPEN':


            default:
              return null;
          }
        })}

        </div>

      <Footer />

  </>
  )
}
