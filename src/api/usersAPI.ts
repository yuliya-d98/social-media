import { GetUsersType } from '../types/api';
import { instance } from './api';

export const usersAPI = {
  getUsers(page: number, count: number) {
    const params = new URLSearchParams({
      page: page.toString(),
      count: count.toString(),
    });
    return instance
      .get<GetUsersType>(`/users?${params.toString()}`)
      .then((responce) => responce.data);
  },
};
