const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const apiConfig = {
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
