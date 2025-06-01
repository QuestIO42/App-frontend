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

// Ao acessar o quiz, cria as questões da tentativa
const postNewQuiz = async (
  id_user: string,
  id_quiz: string,
) => {
  try {
    const response = await api.post(`/userquizquestionanswer`, {
      id_user,
      id_quiz,
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      const { feedback, current_try } = error.response.data;

      // Retorna um objeto indicando que há erro mas com current_try incluso
      return {
        success: false,
        feedback,
        current_try,
      };
    }

    throw error;
  }
};

// Retorna os objetos de resposta do questionario do usuario em uma tentativa
const getQuizAnswers = async (
  id_user: string,
  id_quiz: string,
  current_try: number
) => {
  const response = await api.get(`/userquizquestionanswer/quiz/${id_quiz}`, {
    params: {
      id_user,
      current_try
    }
  });
  return response.data;
};

// Altera o objeto de resposta do questionario do usuário
const updateUserAnswer = async (
  id: string, // UUID da resposta
  payload: {
    text_answer?: string,
    id_answer?: string
  }
) => {
  const response = await api.put(`/userquizquestionanswer/${id}`, payload);
  return response.data;
};

// Envia e salva as respostas de um usuário em um quiz
const submitQuizAnswers = async (
  id_user: string,
  id_quiz: string
) => {
  try {
    const response = await api.post(`/userquizquestionanswer/send`, {
      id_user,
      id_quiz
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      // Retorna o feedback de erro se não houver tentativa aberta
      return error.response.data;
    }
    throw error;
  }
};

// Criado para testar questões verilog
const postVerilogAnswer = async (
  id_user: string,
  id_quiz: string,
  id_question: string,
  text_answer: string,
) => {
  const response = await api.post(`/userquizquestionanswer/check`, {
    id_user,
    id_quiz,
    id_question,
    text_answer,
  });

  return response.data;
};

export {getAnswer, getAllAnswers, postNewQuiz, getQuizAnswers, updateUserAnswer, submitQuizAnswers, postVerilogAnswer}

