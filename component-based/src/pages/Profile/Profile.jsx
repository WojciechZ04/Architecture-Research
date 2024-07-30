import React, { useEffect, useState } from "react";
import "./Profile.css";

export default function Profile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    fetch("http://localhost:5000/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="container profile">
      <div className="profile-image-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
          alt="Profile"
          className="profile-image"
        />
        <i className="material-icons edit-icon">edit</i>
      </div>
      <div className="profile-data">
        <div className="inline">
          <p>Username: </p>
          <p>{profile.username}</p>
          <i className="material-icons profile-icon">edit</i>
        </div>
        <div className="inline">
          <p>Email: </p>
          <p>{profile.email}</p>
          <i className="material-icons profile-icon">edit</i>
        </div>
        <div className="inline">
          <p>Password: </p>
          <p>****************</p>
          <i className="material-icons profile-icon">edit</i>
        </div>
      </div>
    </div>
  );
}
