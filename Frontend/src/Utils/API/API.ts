import axios, { AxiosError } from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:7000/api/",
  withCredentials: true,
});

export const getErrorMessage = (error: any): string => {
  if (error instanceof Error) {
    return error.message || "Failed to check authentication";
  } else if (error instanceof AxiosError) {
    return (
      error.response?.data || error.message || "Failed to check authentication"
    );
  } else return "Failed to check authentication";
};
