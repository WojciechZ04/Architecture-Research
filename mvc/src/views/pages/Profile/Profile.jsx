import React, { useEffect, useState } from "react";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";
import Button from "@mui/material/Button";
import { getProfileData, saveProfileData, removeProfile } from "../../../controllers/ProfileController";
import "./Profile.css";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editType, setEditType] = useState("");
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfileData();
        setProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    loadProfile();
  }, []);

  const handleEditClick = (type, value) => {
    setEditType(type);
    setEditValue(value);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (type, newValue) => {
    try {
      const updatedProfile = await saveProfileData(profile, newValue, type);
      setProfile(updatedProfile);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await removeProfile(profile.id);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
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
          <i
            className="material-icons profile-icon"
            onClick={() => handleEditClick("username", profile.username)}
          >
            edit
          </i>
        </div>
        <div className="inline">
          <p>Email: </p>
          <p>{profile.email}</p>
          <i
            className="material-icons profile-icon"
            onClick={() => handleEditClick("email", profile.email)}
          >
            edit
          </i>
        </div>
        <div className="inline">
          <p>Password: </p>
          <p>****************</p>
          <i
            className="material-icons profile-icon"
            onClick={() => handleEditClick("password")}
          >
            edit
          </i>
        </div>
      </div>
      <Button className="delete" onClick={handleDeleteClick}>
        DELETE ACCOUNT
      </Button>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editType={editType}
        editValue={editValue}
        onSave={handleSave}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  );
}
