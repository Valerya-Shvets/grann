import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5145",
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(function (response) {
  console.log(response.data);
  return response;
});

export default instance;
