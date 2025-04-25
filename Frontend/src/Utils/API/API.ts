import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:7000/api/",
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Handle all error responses here
    toast.error(getErrorMessage(error));

    // Always reject so the calling code can still handle it
    return error;
    // return Promise.resolve(error);
  }
);

export const getErrorMessage = (error: any): string => {
  if (error instanceof AxiosError) {
    return (
      error?.response?.data?.message ||
      error?.message ||
      "Failed to check authentication"
    );
  }

  if (error instanceof Error) {
    return error.message || "Failed to check authentication";
  }

  return "Failed to check authentication";
};
