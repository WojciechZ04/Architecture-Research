import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
	console.log('Project Id: ', projectId);
    // Replace with your actual API endpoint
    fetch(`http://localhost:5000/api/projects/${projectId}`)
      .then((response) => response.json())
      .then((data) => setProject(data))
      .catch((error) => console.error("Error fetching project:", error));
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }
  return (
    <div className='container'>
      <h1>{project.name}</h1>
    </div>
  );
}
