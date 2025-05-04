import { api } from './api'
import { Category } from '@/interfaces/Category'

// Busca todas as categorias
async function getCategories() {
  const response = await api.get('/category')
  return response.data
}

// Cria uma nova categoria
async function createCategory(newCategory: Partial<Category>) {
  const response = await api.post('/category', newCategory)
  return response.data
}

// Busca uma categoria específica
async function getCategory(id: string) {
  const response = await api.get(`/category/${id}`)
  return response.data
}

// Atualiza uma categoria
// Pela lógica do back-end, o nome da categoria não pode ser alterado.
async function updateCategory({
  id,
  updateCategory,
}: {
  id: string
  updateCategory: Partial<Category>
}) {
  const response = await api.put(`/category/${id}`, updateCategory)
  return response.data
}

// Deleta uma categoria
async function deleteCategory(id: string) {
  const response = await api.delete(`/category/${id}`)
  return response.data
}

// Lista categorias de um curso específico
async function getCourseCategories(idCourse: string) {
  const response = await api.get(`/category/course/${idCourse}`)
  return response.data
}

export { getCategories, createCategory, getCategory, updateCategory, deleteCategory, getCourseCategories }