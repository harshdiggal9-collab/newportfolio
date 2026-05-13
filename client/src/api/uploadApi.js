import axiosClient from "./axiosClient";

export const uploadFile = (file) => {
  const body = new FormData();
  body.append("file", file);
  return axiosClient.post("/api/upload", body).then((res) => res.data);
};
