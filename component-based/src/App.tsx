import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";

import Home from "./pages/Home/Home";
import Login from "./pages/Sign/Login";
import Signup from "./pages/Sign/Signup";
import Projects from "./pages/Projects/Projects";
import Tasks from "./pages/Tasks/Tasks";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile/Profile";

const App: React.FC = () => {
    const usePathname = (): string => {
    const location = useLocation();
    return location.pathname;
  };

  const Layout: React.FC = () => {
    const pathname = usePathname();
    const showNavbar: boolean = pathname !== "/login" && pathname !== "/signup";

    return (
      <>
        {showNavbar && <Navbar />}
        <div id="main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<AuthOutlet fallbackPath="/login" />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
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
};

export default App;