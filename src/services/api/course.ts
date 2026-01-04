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
    const response = await api.get(`/course/exportgrade/${courseId}`, {
      responseType: 'blob',
    });
    return response;
  } catch (error) {
    console.error("Erro ao exportar notas:", error);
    throw error;
  }
};

const exportCourse = async (courseId: string) => {
  try {
    const response = await api.get(`/course/export/${courseId}`, {
      responseType: 'blob', 
    });
    return response;
  } catch (error) {
    console.error("Erro ao exportar curso:", error);
    throw error;
  }
};

const importCourse = async (file: File) => {
  try {
    const text = await file.text();
    const jsonData = JSON.parse(text);

    const response = await api.post(`/course/import`, jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error("Erro ao importar curso:", error);
    throw error;
  }
};

export { fetchAllCourses, fetchCourse, fetchAllUserCourses, subscribeToCourse, unsubscribeFromCourse, checkSubscriptionStatus, exportCourseGrades, exportCourse, importCourse }
