import axiosClient from "./axiosClient";

export const getProjects = (params = {}) =>
  axiosClient.get("/api/projects", { params }).then((res) => res.data);

export const getProjectBySlug = (slug) =>
  axiosClient.get(`/api/projects/${slug}`).then((res) => res.data);

export const createProject = (payload) =>
  axiosClient.post("/api/projects", payload).then((res) => res.data);

export const updateProject = (id, payload) =>
  axiosClient.put(`/api/projects/${id}`, payload).then((res) => res.data);

export const deleteProject = (id) =>
  axiosClient.delete(`/api/projects/${id}`).then((res) => res.data);
