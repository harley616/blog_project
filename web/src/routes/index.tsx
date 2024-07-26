import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FC } from "react";
import AlertDisplay from "../components/AlertDisplay";
import NavBar from "../components/NavBar";
import Home from "./home";
import Posts from "./posts";
import LoginModal from "../components/LoginModal";
// Define some basic components

// App component that sets up the router
const Root: FC = () => {
  return (
    <Router>
      <LoginModal />
      <AlertDisplay />
      <div className="flex flex-col bg-blue-300 h-screen">
        <NavBar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/posts" Component={Posts} />
        </Routes>
      </div>
    </Router>
  );
};

export default Root;
