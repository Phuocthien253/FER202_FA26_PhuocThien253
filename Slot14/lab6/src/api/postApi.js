
import axiosClient from "./axiosClient";

const postApi = {
  getAll(params = {}) {
    return axiosClient.get("/posts", { params });
  },

  getById(id, config = {}) {
    return axiosClient.get(`/posts/${id}`, config);
  },

  getComments(id) {
    return axiosClient.get("/comments", {
      params: { postId: id },
    });
  },

  create(data) {
    return axiosClient.post("/posts", data);
  },

  update(id, data) {
    return axiosClient.put(`/posts/${id}`, data);
  },

  patch(id, data) {
    return axiosClient.patch(`/posts/${id}`, data);
  },

  remove(id) {
    return axiosClient.delete(`/posts/${id}`);
  },
};

export default postApi;
