import { Container } from "@mui/material";
import Dashboard from "../components/Dashboard/Dashboard";

export default function Home() {
  return (
    <Container>
      <div id="leftColumn">
        <Dashboard />
      </div>
      <div id="rightColumn"></div>
    </Container>
  );
}
