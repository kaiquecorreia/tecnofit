import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.64.3/Desafio',
});

export default api;
