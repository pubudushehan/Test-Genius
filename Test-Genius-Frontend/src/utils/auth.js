import { apiConfig } from "../config/apiConfig";

export const refreshToken = async () => {
  try {
    const currentToken = localStorage.getItem("token");

    if (!currentToken) {
      throw new Error("No token found");
    }

    const response = await fetch(
      `${apiConfig.baseURL}/api/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: currentToken }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data.token;
  } catch (error) {
    console.error("Token refresh error:", error);
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw error;
  }
};
