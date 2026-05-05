import axios from "axios";
import toast from "react-hot-toast";
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

/* =========================
   REQUEST INTERCEPTOR
========================= */

axiosInstance.interceptors.request.use((config) => {

  const token =
    localStorage.getItem("token") ;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// ================= SUCCESS TOASTER =================

axiosInstance.interceptors.response.use(

  (response) => {

    // 👇 skip toast if config.skipToast === true
    if (response.config?.skipToast) {
      return response;
    }

    const message =
      response?.data?.message ||
      response?.data?.detail;

    if (message) {
      toast.success(message);
    }

    return response;
  },

// ================= ERROR TOASTER =================

  (error) => {

    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      "Something went wrong ❌";

    toast.error(message);

    return Promise.reject(error);
  }
);
export default axiosInstance;
