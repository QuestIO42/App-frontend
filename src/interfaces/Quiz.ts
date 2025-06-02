
export interface Question{
  id: string
  name: string
  content: string
  type: number
  responsible: boolean
  id_category: string
  verified: boolean //Just for Frontend
}

export interface Quiz{
  id: string
  name: string
  id_course: string
  questions: Question[]
  description:string
}

export interface UserQuizQuestionAnswer {
  id: string;
  text_answer: string | null;
  entry_date: string;
  score: number;
  current_try: number;
  delivered: boolean;
  id_user: string;
  id_quiz: string;
  id_question: string;
  id_answer: string | null;
}

