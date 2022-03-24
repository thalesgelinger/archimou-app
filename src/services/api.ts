import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://archimou.herokuapp.com/v1',
});
