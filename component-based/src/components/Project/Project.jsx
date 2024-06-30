import "./Project.css";

export default function Project({ project }) {
  return (
    <div className="project">
      <div className="indicator"></div>
      <p className="project__title">{project.name}</p>
      <p>15 May 2024</p>
      <p>Milestone 2</p>
      {/* <button>Details</button>
      <button>Tasks</button>
      <button>Teams</button> */}
    </div>
  );
}
