import axios from 'axios';

const apiPath = '/api';

const apiHandler = axios.create({
  baseURL: apiPath,
});

export default apiHandler;
