import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";

import Home from "./pages/Home";
import Login from "./pages/Sign/Login";
import Signup from "./pages/Sign/Signup";
import Projects from "./pages/Projects/Projects";
import Tasks from "./pages/Tasks/Tasks";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./pages/NotFound";
import Teams from "./pages/Teams";
import Organizations from "./pages/Organizations/Organizations";
import Organization from "./pages/Organizations/Organization";
import Profile from "./pages/Profile";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    const showNavbar = pathname !== "/login" && pathname !== "/signup";
    return (
      <>
        {showNavbar && <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
        <div id="main" className={isSidebarOpen ? 'sidebar-open' : ''}>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route element={<AuthOutlet fallbackPath="/login" />}>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/organizations" element={<Organizations />}></Route>
              <Route
                path="/organizations/:id"
                element={<Organization />}
              ></Route>
              <Route path="/teams" element={<Teams />}></Route>
              <Route path="/projects" element={<Projects />}></Route>
              <Route path="/tasks" element={<Tasks />}></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Route>
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
