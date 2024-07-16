import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Organization() {
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Assuming the ID is in the URL

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/organizations/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrganization(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [id]); // Dependency array with ID ensures this effect runs again if the ID changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>Organization</h1>
      {organization && (
        <div>
          <p>Name: {organization.organization.name}</p>
          <div>
            <h2>Current projects</h2>
            {/* Assuming projects data might be added similarly in the future */}
          </div>
          <div>
            <h2>Members</h2>
            <ul>
              {organization.users.map(user => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}