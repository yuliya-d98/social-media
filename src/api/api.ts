import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0',
  withCredentials: true,
  headers: {
    'API-KEY': 'e04f9316-830a-404f-ab24-5fbb3da1e0cd',
  },
});
