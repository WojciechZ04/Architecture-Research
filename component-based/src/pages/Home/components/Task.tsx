import "./Task.css";

interface DashboardTaskData {
  id?: string;
  name: string;
  deadline?: string | null;
}

interface DashboardTaskProps {
  task: DashboardTaskData;
}

export default function Task({ task }: DashboardTaskProps) {
  const calculateDaysLeft = (deadline: string): number => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    const timeDifference = deadlineDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const formatDaysLeft = (daysLeft: number): string => {
    if (daysLeft === 0) {
      return "Task due today";
    } else if (daysLeft > 0) {
      return `Days left: ${daysLeft}`;
    } else if (daysLeft === -1) {
      return "Overdue by: 1 day!";
    } else {
      return `Overdue by: ${Math.abs(daysLeft)} days!`;
    }
  };

  const getClassName = (daysLeft: number): string => {
    if (daysLeft > 3) {
      return "days-left-orange";
    } else if (daysLeft >= 0) {
      return "days-left-red";
    } else {
      return "days-left-dark-red";
    }
  };

  return (
    <div className="home-task">
      <h3>{task.name}</h3>
      {" "}
      {task.deadline ? (
        <>
          <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
          <p className={getClassName(calculateDaysLeft(task.deadline))}>
            {formatDaysLeft(calculateDaysLeft(task.deadline))}
          </p>
        </>
      ) : (
        "-"
      )}
    </div>
  );
}