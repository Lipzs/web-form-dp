import axios from 'axios';

const api = axios.create({
  baseURL: 'https://form-fp.herokuapp.com',
});

export default api;