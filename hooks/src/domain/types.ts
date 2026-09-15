export type TaskStatus = "Not started" | "In progress" | "Done";

export interface TaskDto {
  id: string;
  name: string;
  project_id: string;
  project_name?: string;
  deadline?: string | null;
  description?: string;
  status: TaskStatus;
}

export interface ProjectDto {
  id: string;
  name: string;
  deadline: string;
  description?: string;
  tasks: TaskDto[];
}

export interface ProjectSummaryDto {
  id: string;
  name: string;
  deadline: string;
  description?: string;
}

export interface UserProfileDto {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  [key: string]: any;
}

export type ProjectStatus = "completed" | "active" | "inactive";

export interface EnrichedProject extends ProjectDto {
  completionPercentage: number;
  status: ProjectStatus;
}

export interface CreateProjectPayload {
  name: string;
  deadline: string | null;
  description: string;
}

export interface UpdateProjectPayload {
  name: string;
  deadline: string;
  description: string;
}

export interface CreateTaskPayload {
  name: string;
  description: string;
  projectId: string;
  status: TaskStatus;
  deadline: string | null;
}
