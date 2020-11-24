import axios from "axios";

export function httpClient(config) {
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:5030',
    timeout: 5000,
  })

  axiosInstance.interceptors.request.use(
    (config) => {
      console.log('axios.interceptors.request.success', config);
      return config;
    },
    (error) => {
      console.log('axios.interceptors.request.failuare', error);
    }
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log('axios.interceptors.response.success', response);
      return response.data;
    },
    (error) => {
      console.log('axios.interceptors.response.failuare', error);
    }
  )

  return axiosInstance(config);
}
