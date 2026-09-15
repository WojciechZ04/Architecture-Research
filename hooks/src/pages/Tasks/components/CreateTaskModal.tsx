/**
 * CreateTaskModal.tsx (wariant: hooks)
 * -----------------------------------------------------------------------
 * Dwie oddzielne odpowiedzialności, dwa oddzielne hooki:
 *  - useProjectOptions()  -> lista projektów do dropdowna,
 *  - useCreateTask()      -> stan formularza + zapis nowego zadania.
 * To dobry przykład tego, że "logika w komponencie" wcale nie musi trafić
 * do JEDNEGO hooka - dzielimy ją tak samo, jak dzielilibyśmy funkcje
 * w dobrze zorganizowanym kodzie proceduralnym: po odpowiedzialności.
 */
import { Box, Button, Modal, MenuItem, Select, Checkbox, TextField, SelectChangeEvent } from "@mui/material";
import "../../../components/Modal.css";
import { useCreateTask } from "../../../hooks/useCreateTask";
import { useProjectOptions } from "../../../hooks/useProjectOptions";
import { TaskStatus } from "../../../domain/types";

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  taskStatus: TaskStatus;
  onCreated: () => void;
}

export default function CreateTaskModal({ open, onClose, taskStatus, onCreated }: CreateTaskModalProps) {
  const { projectOptions } = useProjectOptions();
  const {
    name,
    setName,
    description,
    setDescription,
    projectId,
    setProjectId,
    deadline,
    setDeadline,
    hasDeadline,
    setHasDeadline,
    error,
    handleClose,
    handleSubmit,
  } = useCreateTask({ taskStatus, onCreated, onClose });

  if (!open) return null;

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-name" aria-describedby="modal-modal-description">
      <Box className="modal">
        <h2>Create task</h2>
        <TextField label="Task name" value={name} onChange={(e) => setName(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <br />
        <Select value={projectId} onChange={(e: SelectChangeEvent) => setProjectId(e.target.value as string)} displayEmpty>
          <MenuItem value="" disabled>
            Select Project
          </MenuItem>
          {projectOptions.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
        <br />
        <label className="custom-checkbox">
          <Checkbox
            checked={hasDeadline}
            onChange={(e) => setHasDeadline(e.target.checked)}
            sx={{
              color: "var(--neutral-color)",
              "&.Mui-checked": { color: "var(--neutral-color)" },
            }}
          />
          <span>Set a finish date</span>
        </label>
        {hasDeadline && (
          <TextField sx={{ marginTop: "10px" }} type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        )}
        <br />
        <TextField
          multiline
          minRows={4}
          maxRows={6}
          label="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="modal-buttons">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </div>
      </Box>
    </Modal>
  );
}
