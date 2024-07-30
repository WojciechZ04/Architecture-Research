import React, { useEffect, useState } from "react";
import EditModal from "./components/EditModal";
import "./Profile.css";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editType, setEditType] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    const token = localStorage.getItem('token');
    fetch("http://localhost:5000/api/profile", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleEditClick = (type) => {
    setEditType(type);
    setIsModalOpen(true);
  };

  const handleSave = (type, newValue) => {
    const updatedProfile = {
      ...profile,
      [type]: newValue,
    };

    const token = localStorage.getItem('token');
    fetch(`http://localhost:5000/api/profile/${profile.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
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
          <i className="material-icons profile-icon" onClick={() => handleEditClick('username')}>edit</i>
        </div>
        <div className="inline">
          <p>Email: </p>
          <p>{profile.email}</p>
          <i className="material-icons profile-icon" onClick={() => handleEditClick('email')}>edit</i>
        </div>
        <div className="inline">
          <p>Password: </p>
          <p>****************</p>
          <i className="material-icons profile-icon" onClick={() => handleEditClick('password')}>edit</i>
        </div>
      </div>
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editType={editType}
        onSave={handleSave}
      />
    </div>
  );
}
