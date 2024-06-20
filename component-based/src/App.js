import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./pages/NotFound";
import Teams from "./pages/Teams";

function App() {
  const [mainMargin, setMainMargin] = useState('85px');
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data);
        console.log("Data fetched:", data.users);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
  return (
    <div className="App">
      <Router>
        <Navbar setMainMargin={setMainMargin}/>
        <div id="main" style={{ marginLeft: mainMargin }}>
          <Routes>
            <Route path="/teams" element={<Teams />}></Route>
            <Route path="/projects" element={<Projects />}></Route>
            <Route path="/tasks" element={<Tasks />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
