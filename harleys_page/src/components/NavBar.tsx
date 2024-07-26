import { FC } from "react";
import Box from "./Box";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { showLogin } from "../store/slice/login";

const NavBar: FC = () => {
  const dispatch = useAppDispatch();
  const handleShowLogin = () => {
    dispatch(showLogin());
  };
  return (
    <Box className="flex gap-2 m-0">
      <Link to="/">Home</Link>
      <Link to="/posts">Posts</Link>
      <p
        className="hover:text-blue-300 cursor-pointer"
        onClick={() => handleShowLogin()}
      >
        Login
      </p>
    </Box>
  );
};

export default NavBar;
