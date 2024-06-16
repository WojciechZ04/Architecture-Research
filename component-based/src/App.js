import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";

function App() {
  const [mainMargin, setMainMargin] = useState('85px');
  
  
  return (
    <div className="App">
      <Router>
        <Navbar setMainMargin={setMainMargin}/>
        <div id="main" style={{ marginLeft: mainMargin }}>
          <Routes>
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
