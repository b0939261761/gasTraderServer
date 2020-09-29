import axios from 'axios';

const http = axios.create({
  baseURL: process.env.BASE_URL_1C
});

const requestUse = config => {
  const configNew = config;
  if (!configNew.data) configNew.data = {};
  configNew.data.api_key = process.env.API_KEY_1C;
  return configNew;
};

const requestError = async error => Promise.reject(error);

http.interceptors.request.use(requestUse, requestError);

export default http;
