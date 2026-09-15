/**
 * Profile.tsx (wariant: hooks)
 * -----------------------------------------------------------------------
 * fetch/save/delete przeniesione do useProfile(). Stan otwarcia modali
 * i "który typ pola edytujemy" (editType/editValue) to stan UI potrzebny
 * tylko do sterowania widokiem - zostaje lokalnie w komponencie.
 */
import { useState } from "react";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";
import Button from "@mui/material/Button";
import { useProfile } from "../../hooks/useProfile";
import "./Profile.css";

export default function Profile() {
  const { profile, saveField, deleteAccount } = useProfile();

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [editType, setEditType] = useState<string>("");
  const [editValue, setEditValue] = useState<string>("");

  const handleEditClick = (type: string, value?: string) => {
    setEditType(type);
    setEditValue(value || "");
    setIsEditModalOpen(true);
  };

  const handleSave = async (type: string, newValue: string) => {
    await saveField(type, newValue);
    setIsEditModalOpen(false);
  };

  const handleDelete = async () => {
    const deleted = await deleteAccount();
    if (deleted) {
      window.location.href = "/login";
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
          <i className="material-icons profile-icon" onClick={() => handleEditClick("username", profile.username)}>
            edit
          </i>
        </div>
        <div className="inline">
          <p>Email: </p>
          <p>{profile.email}</p>
          <i className="material-icons profile-icon" onClick={() => handleEditClick("email", profile.email)}>
            edit
          </i>
        </div>
        <div className="inline">
          <p>Password: </p>
          <p>****************</p>
          <i className="material-icons profile-icon" onClick={() => handleEditClick("password")}>
            edit
          </i>
        </div>
      </div>
      <Button className="delete" onClick={() => setIsDeleteModalOpen(true)}>
        DELETE ACCOUNT
      </Button>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editType={editType}
        editValue={editValue}
        onSave={handleSave}
      />
      <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={handleDelete} />
    </div>
  );
}
