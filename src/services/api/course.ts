import { api } from './api'

const fetchAllCourses = async () => {
  const response = await api.get('/course')
  return response
}

const fetchCourse = async (id: string) => {
  const response = await api.get(`/course/${id}`)
  return response
}

const fetchAllUserCourses = async (id: string) => {
  const response = await api.get(`/course/user/${id}`)
  return response.data
}

const subscribeToCourse = async (courseId: string, userId: string) => {
  const response = await api.post(`/usercourse`, { 
    id_course: courseId,
    id_user: userId,
    xp: 0
  });
  return response.data;
};

const unsubscribeFromCourse = async (courseId: string, userId: string) => {
  const response = await api.delete(`/usercourse/${userId}/${courseId}/`);
  return response.data;
};

const checkSubscriptionStatus = async (courseId: string, userId: string) => {
  const response = await api.get(`/usercourse/${userId}/${courseId}/`);
  return response;
};

const exportCourseGrades = async (courseId: string) => {
  try {
    //                                     👇
    // URL ajustada para corresponder exatamente à sua rota do backend
    const response = await api.get(`/course/exportgrade/${courseId}`, {
      responseType: 'blob', // Essencial para o download de arquivos
    });
    return response;
  } catch (error) {
    console.error("Erro ao exportar notas:", error);
    throw error;
  }
};

export { fetchAllCourses, fetchCourse, fetchAllUserCourses, subscribeToCourse, unsubscribeFromCourse, checkSubscriptionStatus, exportCourseGrades }
