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
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleCreateOrganization = () => {
    fetch("http://localhost:5000/api/organizations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: orgName }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchOrganizations();
        handleClose();
        setOrgName("");
      })
      .catch((error) => {
        console.error("Error creating organization:", error);
      });
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

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
      <button onClick={handleOpen}>Create organization</button>
      <Modal
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateOrganization}>Create</Button>
        </Box>
      </Modal>
    </div>
  );
}
