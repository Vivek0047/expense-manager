import axios from 'axios';
import router from "@/router/index";

const instance = axios.create({
  baseURL: 'http://localhost:55430/api',
  timeout: 1200000
});

instance.interceptors.request.use(function (config) {
  const token = 'Bearer ' + localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status == 401) {
    localStorage.removeItem('token');
    router.push({name: 'Login'});
  }

  return Promise.reject(error);
});

export default instance;
