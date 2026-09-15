/**
 * Home/components/Project.tsx (wariant: hooks) - karta projektu na dashboardzie
 * -----------------------------------------------------------------------
 * Bez większych zmian - Math.ceil na completionPercentage zostaje tu,
 * bo w useHomeDashboard.ts liczymy je już zaokrąglone przez
 * calculateCompletionPercentage() z domain/projectStats.ts (to samo
 * źródło co w module Projects). Zaokrąglenie tutaj jest więc "no-opem"
 * zachowanym z oryginału dla bezpieczeństwa (idempotentne), ale realnie
 * już niepotrzebne - zostawione świadomie, żeby zachować 1:1 zgodność
 * wizualną z resztą wariantów w pracy.
 */
import "./Project.css";
import BorderLinearProgress from "../../../components/BorderLinearProgress";

interface DashboardProjectProps {
  project: { name: string; deadline?: string | null };
  completionPercentage: number;
}

export default function Project({ project, completionPercentage }: DashboardProjectProps) {
  const roundedCompletionPercentage = Math.ceil(completionPercentage);

  return (
    <div className="home-project">
      <h3>{project.name}</h3>
      <p className="deadline"> {project.deadline ? new Date(project.deadline).toLocaleDateString() : "-"}</p>
      <div className="progress-bar">
        <BorderLinearProgress className="border-linear-progress" variant="determinate" value={roundedCompletionPercentage} />
        <p>{roundedCompletionPercentage} %</p>
      </div>
    </div>
  );
}
