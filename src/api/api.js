import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0",
  withCredentials: true,
  headers: {
    "API-KEY": "e04f9316-830a-404f-ab24-5fbb3da1e0cd",
  },
});

export const usersAPI = {
  getUsers(page, count) {
    const params = new URLSearchParams({
      page,
      count,
    });
    return instance
      .get(`/users?${params.toString()}`)
      .then((responce) => responce.data);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return instance
      .get(`/profile/${userId}`)
      .then((responce) => responce.data)
      .catch((e) => console.error(e));
  },
  getStatus(userId) {
    return instance
      .get(`/profile/status/${userId}`)
      .then((responce) => responce.data);
  },
  updateStatus(status) {
    return instance
      .put(`/profile/status`, { status })
      .then((responce) => responce.data);
  },
};

export const followAPI = {
  followUser(userId) {
    return instance.post(`/follow/${userId}`).then((responce) => responce.data);
  },
  unfollowUser(userId) {
    return instance
      .delete(`/follow/${userId}`)
      .then((responce) => responce.data);
  },
};

export const authAPI = {
  getAuthorisedUserInfo() {
    return instance.get("/auth/me").then((responce) => responce.data);
  },
};
