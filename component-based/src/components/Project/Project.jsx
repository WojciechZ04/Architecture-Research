import "./Project.css";

export default function Project({ project }) {
  return (
    <div className="project">
      <h2 className="project__title">{project.name}</h2>
      <button>Details</button>
      <button>Tasks</button>
      <button>Teams</button>
    </div>
  );
}
