import { GetUsersType } from '../types/api';
import { instance } from './api';

export const usersAPI = {
  getUsers(page: number, count: number, term = '', friend: null | boolean = null) {
    const params = new URLSearchParams({
      page: page.toString(),
      count: count.toString(),
      ...(term && { term: term }),
      ...(friend && { friend: friend.toString() }),
    });
    return instance
      .get<GetUsersType>(`/users?${params.toString()}`)
      .then((responce) => responce.data);
  },
};
