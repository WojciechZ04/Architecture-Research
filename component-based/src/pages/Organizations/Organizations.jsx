import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const [orgName, setOrgName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [openJoinModal, setOpenJoinModal] = React.useState(false);
  const handleOpenJoinModal = () => setOpenJoinModal(true);
  const handleCloseJoinModal = () => setOpenJoinModal(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);
  const navigate = useNavigate();

  const fetchOrganizations = () => {
    const yourTokenVariable = localStorage.getItem('token');
    fetch("http://localhost:5000/api/organizations", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + yourTokenVariable,
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrganizations(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleCreateOrganization = () => {
    const yourTokenVariable = localStorage.getItem('token');
    fetch("http://localhost:5000/api/organizations", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + yourTokenVariable,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: orgName }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchOrganizations();
        handleCloseCreateModal();
        setOrgName("");
      })
      .catch((error) => {
        console.error("Error creating organization:", error);
      });
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleJoinOrganization = () => {
    fetch('http://localhost:5000/api/organizations/join', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: joinCode })
    })
    .then((res) => {
      if(!res.ok) {
        throw new Error('Failed to join organization');
      }
      return res.json();
    })
    .then((data) => {
      console.log("Successfully joined organization", data);
      fetchOrganizations();
      handleCloseJoinModal();
      setJoinCode("");
    })
    .catch((error) => {
      console.error("Error joining organization:", error);
    });
  }

  const handleOrgClick = (id) => {
    navigate(`/organizations/${id}`);
  };

  return (
    <div>
      <h1>Organizations</h1>
      {organizations === null ? (
        <p>Loading organizations...</p>
      ) : organizations.length > 0 ? (
        <div>
          {organizations.map((org, index) => (
            <div onClick={() => handleOrgClick(org.id)}>
              <p key={index}>{org.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>You are not in any organization.</p>
      )}
      <button onClick={handleOpenCreateModal}>Create organization</button>
      <Modal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        aria-labelledby="modal-modal-name"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Create organization</h2>
          <Input
            placeholder="Organization name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
          <Button onClick={handleCloseCreateModal}>Cancel</Button>
          <Button onClick={handleCreateOrganization}>Create</Button>
        </Box>
      </Modal>
      <button onClick={handleOpenJoinModal}>Join organization</button>
      <Modal
        open={openJoinModal}
        onClose={handleCloseJoinModal}
        aria-labelledby="modal-modal-name"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Join organization</h2>
          <Input
            placeholder="Join code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
          />
          <Button onClick={handleCloseJoinModal}>Cancel</Button>
          <Button onClick={handleJoinOrganization}>Join</Button>
        </Box>
      </Modal>
    </div>
  );
}
