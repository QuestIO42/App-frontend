import {api} from './api'

const getAnswer = async (idQuestion: string) => {
  const response = await api.get(`/answer/question/${idQuestion}`) //Obtem todas as respsotas de uma questao
  console.log("resposta individual: ", response.data)
  return response.data
}

const getAllAnswers = async (idQuestion: string[]) => {
  console.log("idQuestion", idQuestion)
  const iterators = idQuestion.map(id => getAnswer(id)); //Obtem todas as respostas de todas as questoes
  const answers = await Promise.all(iterators);
  console.log("respostas aqui em",answers)
  return answers
}

const postUserAnswer = async (
  id_user: string,
  id_quiz: string,
  id_question: string,
  id_answer: string,
  text_answer: string,
  score: number
) => {
  const response = await api.post(`/userquizquestionanswer`, {
    id_user,
    id_quiz,
    id_question,
    id_answer,
    text_answer,
    score
  })
  return response.data
}

// Criado para testar questões verilog
const postVerilogAnswer = async (
  id_user: string,
  id_quiz: string,
  id_question: string,
  text_answer: string,
  id_answer: string
) => {
  const response = await api.post(`/userquizquestionanswer`, {
    id_user,
    id_quiz,
    id_question,
    text_answer,
    id_answer,
    score: 0
  });

  return response.data;
};

export {getAnswer, getAllAnswers, postUserAnswer, postVerilogAnswer}

