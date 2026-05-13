import axiosClient from "./axiosClient";

export const getClients = () => axiosClient.get("/api/clients").then((res) => res.data);

export const createClient = (payload) =>
  axiosClient.post("/api/clients", payload).then((res) => res.data);

export const updateClient = (id, payload) =>
  axiosClient.put(`/api/clients/${id}`, payload).then((res) => res.data);

export const deleteClient = (id) =>
  axiosClient.delete(`/api/clients/${id}`).then((res) => res.data);
