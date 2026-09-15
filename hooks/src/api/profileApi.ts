import { apiFetch } from "./httpClient";
import { UserProfileDto } from "../domain/types";

export const profileApi = {
  getAll(): Promise<UserProfileDto[]> {
    return apiFetch<UserProfileDto[]>("/profile");
  },

  update(id: string, payload: UserProfileDto): Promise<UserProfileDto> {
    return apiFetch<UserProfileDto>(`/profile/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  remove(id: string): Promise<void> {
    return apiFetch<void>(`/profile/${id}`, { method: "DELETE" });
  },
};
