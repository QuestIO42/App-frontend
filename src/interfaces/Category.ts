export interface Category {
  id: string
  id_course: string // UUID do curso
  id_parent?: string | null // UUID da categoria pai (se houver)
  name: string
}
