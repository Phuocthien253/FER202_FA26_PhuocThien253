
import axiosClient from "./axiosClient";

const userApi = {
  getAll(params = {}) {
    return axiosClient.get("/users", { params });
  },

  getById(id) {
    return axiosClient.get(`/users/${id}`);
  },
};

export default userApi;
