import { apiFetch } from "./httpClient";
import { ProjectSummaryDto, TaskDto, UserProfileDto } from "../domain/types";

export interface HomeDashboardDto {
  users: UserProfileDto[];
  projects: ProjectSummaryDto[];
  tasks: TaskDto[];
}

export const homeApi = {
  getDashboardData(): Promise<HomeDashboardDto> {
    return apiFetch<HomeDashboardDto>("/home");
  },
};
