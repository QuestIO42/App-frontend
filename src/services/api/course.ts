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
    id_user: userId
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

export { fetchAllCourses, fetchCourse, fetchAllUserCourses, subscribeToCourse, unsubscribeFromCourse, checkSubscriptionStatus }
