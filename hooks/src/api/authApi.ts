import { apiFetch } from "./httpClient";

export interface AuthResponse {
  token: string;
}

export const authApi = {
  login(username: string, password: string): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/sign/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  },

  signup(username: string, email: string, password: string): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/sign/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });
  },
};
