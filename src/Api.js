import axios from 'axios';

export const Api = axios.create({
  baseURL: process.env.VUE_APP_FILIALEN_BASE_URL,
  timeout: 1000,
});
