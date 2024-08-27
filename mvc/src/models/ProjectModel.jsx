export const fetchProjectsFromAPI = async () => {
  const response = await fetch("http://localhost:5000/api/projects", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const createProject = async (projectData) => {
  const response = await fetch("http://localhost:5000/api/projects", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  return await response.json();
};

export const processProjects = (projects, sortValue) => {
  return projects
    .map((project) => {
      const completedTasks = project.tasks.filter(
        (task) => task.status === "Done"
      ).length;
      const totalTasks = project.tasks.length;
      const completionPercentage =
        totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
      const roundedCompletionPercentage = Math.ceil(completionPercentage);
      return { ...project, roundedCompletionPercentage };
    })
    .sort((a, b) => sortProjects(a, b, sortValue));
};

const sortProjects = (a, b, sortValue) => {
  const [criteria, direction] = sortValue.split("-");
  let fieldA, fieldB;

  if (criteria === "date") {
    fieldA = new Date(a.deadline);
    fieldB = new Date(b.deadline);
  } else if (criteria === "name") {
    fieldA = a.name.toLowerCase();
    fieldB = b.name.toLowerCase();
  }

  if (direction === "asc") {
    return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
  } else {
    return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
  }
};

export const deleteProject = async (projectId) => {
  const response = await fetch(
    `http://localhost:5000/api/projects/${projectId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }

  return response.ok;
};

export const updateProject = async (projectId, projectData) => {
  const response = await fetch(
    `http://localhost:5000/api/projects/${projectId}`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update project");
  }

  return response.ok;
};
