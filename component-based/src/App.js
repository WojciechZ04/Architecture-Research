import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./pages/NotFound";
import Teams from "./pages/Teams";

function App() {
  const [mainMargin, setMainMargin] = useState('85px');

  // Custom hook to get the current location
  function usePathname() {
    const location = useLocation();
    return location.pathname;
  }

  // Using the custom hook inside the main App component will cause an error
  // because hooks cannot be called conditionally or outside of a function component body.
  // We need to create a separate component that uses this hook and renders conditionally based on the path.

  const Layout = () => {
    const pathname = usePathname();
    const showNavbar = pathname !== '/login' && pathname !== '/signup';
    return (
      <>
        {showNavbar && <Navbar setMainMargin={setMainMargin} />}
        <div id="main" style={{ marginLeft: showNavbar ? mainMargin : '0px' }}>
          <Routes>
            <Route path="login" element={<Login />}></Route>
            <Route path="signup" element={<Signup />}></Route>
            <Route path="/teams" element={<Teams />}></Route>
            <Route path="/projects" element={<Projects />}></Route>
            <Route path="/tasks" element={<Tasks />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </>
    );
  };

  return (
    <div className="App">
      <Router>
        <Layout />
      </Router>
    </div>
  );
}

export default App;