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
