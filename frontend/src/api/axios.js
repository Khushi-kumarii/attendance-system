import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api'
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = token;
  return config;
});

instance.interceptors.response.use(
  res => res,
  err => {
    const status = err.response?.status;

    if (status === 401 || status === 403) {
      localStorage.clear();
      window.location.href = '/'; 
    }

    return Promise.reject(err);
  }
);

export default instance;
