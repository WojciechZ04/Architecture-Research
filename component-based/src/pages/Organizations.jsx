import React, { useState, useEffect } from "react";

export default function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const fetchOrganizations = () => {
    fetch("http://localhost:5000/api/organizations")
      .then((res) => res.json())
      .then((data) => {
        setOrganizations(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <div>
      <h1>Organizations</h1>
      {organizations === null ? (
        <p>Loading organizations...</p>
      ) : organizations.length > 0 ? (
        <ul>
          {organizations.map((org, index) => (
            <li key={index}>{org.name}</li> // Access the name property of each organization object
          ))}
        </ul>
      ) : (
        <p>You are not in any organization.</p>
      )}
    </div>
  );
}
