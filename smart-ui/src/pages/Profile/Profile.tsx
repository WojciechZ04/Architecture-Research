import { useEffect, useState } from "react";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";
import Button from "@mui/material/Button";
import "./Profile.css";

interface UserProfile {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  // Pozwala na dynamiczne aktualizowanie kluczy obiektu np. [type]: newValue
  [key: string]: any; //???????
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>({});
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [editType, setEditType] = useState<string>("");
  const [editValue, setEditValue] = useState<string>("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch profile");
      
      const data = await response.json();
      setProfile(data[0] || {});
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditClick = (type: string, value?: string) => {
    setEditType(type);
    setEditValue(value || "");
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (type: string, newValue: string) => {
    const updatedProfile: UserProfile = {
      ...profile,
      [type]: newValue,
    };

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/profile/${profile.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) throw new Error("Failed to update profile");
      
      const data = await response.json();
      setProfile(data);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/profile/${profile.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        window.location.href = "/login";
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete profile");
      }
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