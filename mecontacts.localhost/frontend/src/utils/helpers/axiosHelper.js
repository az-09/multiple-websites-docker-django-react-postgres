import axios from 'axios';

const axiosHelper =  (history = null) => {
  const baseURL = window.location.origin === 'http://localhost:3000' ? 'http://127.0.0.1:8000/api/' : window.location.origin +'/api/'
  const headers = {};

  if (localStorage.token) {
    headers.Authorization = `Bearer ${localStorage.token}`;
  }

  const axiosHelper = axios.create({
    baseURL,
    headers,
  });

  axiosHelper.interceptors.response.use(
    (response) => new Promise((resolve) => {
      resolve(response);
    }),
    (error) => {
      // when error is not from server
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 403) {
        localStorage.removeItem('token');
        if (history) {
          history.push('/auth/login');
        } else {
          window.location = '/auth/login';
        }
      }
      
      return new Promise((resolve, reject) => {
        reject(error);
      });
    },
  );

  return axiosHelper;
};

export default axiosHelper