import axios, { AxiosInstance } from 'axios';

const ins: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3001/',
});

ins.interceptors.request.use(
  (config) => {
    console.log(config);
    return config;
  },
  (e) => {
    console.log(e);
    return Promise.reject(e);
  }
);

ins.interceptors.response.use(
  (config) => {
    console.log(config);
    return config;
  },
  (e) => {
    console.log(e);
    return Promise.reject(e);
  }
);

export { ins };
