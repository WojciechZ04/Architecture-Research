import { fetchHomeData } from "../models/HomeModel";

export async function loadHomeData(setUser, setTasks, setProjects) {
  try {
    const data = await fetchHomeData();

    setUser(data.users[0]);

    const filteredTasks = data.tasks.filter((task) => task.status !== "Done");
    const tasksWithDeadline = filteredTasks.filter((task) => task.deadline);
    const tasksWithoutDeadline = filteredTasks.filter((task) => !task.deadline);
    tasksWithDeadline.sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline)
    );
    const combinedTasks = [...tasksWithDeadline, ...tasksWithoutDeadline].slice(
      0,
      3
    );

    setTasks(combinedTasks);

    const projectsWithCompletion = data.projects.map((project) => {
      const projectTasks = data.tasks.filter(
        (task) => task.project_id === project.id
      );
      const completedTasks = projectTasks.filter(
        (task) => task.status === "Done"
      ).length;
      const totalTasks = projectTasks.length;
      const completionPercentage =
        totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
      return { ...project, completionPercentage };
    });

    setProjects(projectsWithCompletion);
  } catch (error) {
    console.error("Error loading home data:", error);
  }
}

export function calculateDaysLeft(deadline) {
  const currentDate = new Date();
  const deadlineDate = new Date(deadline);
  const timeDifference = deadlineDate - currentDate;
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}

export function formatDaysLeft(daysLeft) {
  if (daysLeft === 0) {
    return "Task due today";
  } else if (daysLeft > 0) {
    return `Days left: ${daysLeft}`;
  } else if (daysLeft === -1) {
    return "Overdue by: 1 day!";
  } else {
    return `Overdue by: ${Math.abs(daysLeft)} days!`;
  }
}

export function getClassName(daysLeft) {
  if (daysLeft > 3) {
    return "days-left-orange";
  } else if (daysLeft >= 0) {
    return "days-left-red";
  } else {
    return "days-left-dark-red";
  }
}

export function getFormattedDeadline(deadline) {
  return deadline ? new Date(deadline).toLocaleDateString() : "-";
}

export function getRoundedCompletionPercentage(completionPercentage) {
  return Math.ceil(completionPercentage);
}
