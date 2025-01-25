
export interface Question{
  name: string
  content: string
  type: number
  responsible: boolean
  id_category: string
}

export interface Quiz{
  id: string
  name: string
  id_course: string
  questions: Question[]
}

