import { api } from './api'
import { UserUpdateProps } from '@/interfaces/User'

async function getUser(id: string) {
  const userResponse = await api.get(`/user/${id}`)
  return userResponse.data
}

// Busca usuários de um curso, filtrando por role (ex: 1)
async function getUsersInCourse(
  idCourse: string,
  role?: number
) {
  const response = await api.get(`/user/course/${idCourse}`, {
    params: { course_role: role }
  })
  return response.data
}

const fetchUserRoleInCourse = async (userId: string, courseId: string) => {
  const response = await api.get(`/usercourse/${userId}/${courseId}`);
  return response.data;
};

async function signIn() {
  const response = await api.post('/auth/login')
  return response.data
}

async function updateUser({
  updateUser,
  verificationCode,
}: {
  updateUser: Partial<UserUpdateProps>
  verificationCode: string
}) {
  const response = await api.post(`/auth/reset-password/${verificationCode}`, updateUser)
  return response.data
}

export { getUser, getUsersInCourse, signIn, updateUser, fetchUserRoleInCourse }
