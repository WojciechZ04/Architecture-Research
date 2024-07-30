import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import './EditModal.css';

export default function EditModal({ isOpen, onClose, editType, onSave }) {
	const [value, setValue] = useState('');

	const handleSave = () => {
		onSave(editType, value);
    setValue('');
		onClose();
	  };

  return (
	<Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-name"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">
        <h2>Edit {editType}</h2>
        <Input
          placeholder={`Enter new ${editType}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <br />
        <div className="modal-buttons">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Box>
    </Modal>
  );
}