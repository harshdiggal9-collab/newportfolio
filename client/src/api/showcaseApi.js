import axiosClient from "./axiosClient";

export const getShowcases = (params = {}) =>
  axiosClient.get("/api/showcase", { params }).then((res) => res.data);

export const getShowcaseBySlug = (slug) =>
  axiosClient.get(`/api/showcase/item/${slug}`).then((res) => res.data);

export const getShowcasesAdmin = () =>
  axiosClient.get("/api/showcase/admin/all").then((res) => res.data);

export const createShowcase = (payload) =>
  axiosClient.post("/api/showcase", payload).then((res) => res.data);

export const updateShowcase = (id, payload) =>
  axiosClient.put(`/api/showcase/${id}`, payload).then((res) => res.data);

export const deleteShowcase = (id) =>
  axiosClient.delete(`/api/showcase/${id}`).then((res) => res.data);
