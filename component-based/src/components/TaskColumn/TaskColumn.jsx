import "./TaskColumn.css";
import Task from "./Task/Task";
import * as React from "react";
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

export default function TaskColumn(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const className =
    props.value === "To do"
      ? "to-do-column"
      : props.value === "In progress"
      ? "in-progress-column"
      : props.value === "Done"
      ? "done-column"
      : "default-column";

  return (
    <div className={className}>
      {props.value}
      {props.tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}

      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Create task</h2>
          <Input placeholder="Task title" />
          <Input placeholder="Task description" />
		  <Button onClick={handleClose}>Cancel</Button>
		  <Button>Create</Button>
        </Box>
      </Modal>
    </div>
  );
}
