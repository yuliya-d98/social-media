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
  updatePhoto(photo) {
    const formData = new FormData();
    formData.append("image", photo);
    return instance
      .put(`/profile/photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((responce) => responce.data);
  },
  setProfile(userId, formData) {
    return instance
      .put(`/profile`, { userId, ...formData })
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
  me() {
    return instance.get("/auth/me").then((responce) => responce.data);
  },
  login(email, password, captcha, rememberMe = false) {
    return instance
      .post("/auth/login", { email, password, captcha, rememberMe })
      .then((responce) => responce.data);
  },
  logout() {
    return instance.delete("/auth/login").then((responce) => responce.data);
  },
};

export const securityAPI = {
  getCaptchaURL() {
    return instance
      .get("/security/get-captcha-url")
      .then((responce) => responce.data);
  },
};
