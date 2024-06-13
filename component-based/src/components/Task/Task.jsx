import Checkbox from "@mui/material/Checkbox";

export default function Task() {
  return (
    <tr>
      <td>
        <Checkbox />
        Task will go here
      </td>
      <td className="centered">High</td>
      <td className="centered">
        <button>Details</button>
      </td>
      <td className="centered">25/06/2024</td>
    </tr>
  );
}
