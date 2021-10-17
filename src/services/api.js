import axios from 'axios';

const apiPath = '/api';

const api = axios.create({
  baseURL: apiPath,
});

export default api;
