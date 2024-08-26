import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";

import Home from "./views/pages/Home/Home";
import Login from "./views/pages/Sign/Login";
import Signup from "./views/pages/Sign/Signup";
import Projects from "./views/pages/Projects/Projects";
import ProjectDetails from "./views/pages/ProjectDetails/ProjectDetails";
import Tasks from "./views/pages/Tasks/Tasks";
import Navbar from "./views/components/Navbar/Navbar";
import NotFound from "./views/pages/NotFound";
import Profile from "./views/pages/Profile/Profile";

function App() {
  function usePathname() {
    const location = useLocation();
    return location.pathname;
  }

  const Layout = () => {
    const pathname = usePathname();
    const showNavbar = pathname !== "/login" && pathname !== "/signup";

    return (
      <>
        {showNavbar && <Navbar />}
        <div id="main">
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route element={<AuthOutlet fallbackPath="/login" />}>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/projects" element={<Projects />}></Route>
              <Route
                path="/projects/:projectId"
                element={<ProjectDetails />}
              ></Route>
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
