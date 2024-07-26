import { FC, useState } from "react";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { hideLogin } from "../store/slice/login";
import { login } from "../store/slice/auth";
import Box from "./Box";
import Text from "./Text";
import call from "../store/api";
import {
  showMessageWithTimeout,
  showErrorMessageWithTimeout,
} from "../store/slice/alert";

const LoginModal: FC = () => {
  const dispatch = useAppDispatch();
  const showLogin = useAppSelector((state) => state.login.show);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCloseLogin = () => {
    dispatch(hideLogin());
  };

  const handleLogin = () => {
    call("post", "/login", { username, password })
      .then((res: any) => {
        const { token } = res;
        localStorage.setItem("token", token);
        dispatch(showMessageWithTimeout("Logged in"));
        dispatch(hideLogin());
        dispatch(login());
      })
      .catch((err: any) => {
        dispatch(showErrorMessageWithTimeout("Login Failed"));
      });
  };

  return (
    <Modal show={showLogin}>
      <Box className="bg-white">
        <Text children="Login" />
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => handleLogin()}>Login</button>

        <button onClick={() => handleCloseLogin()}>close</button>
      </Box>
    </Modal>
  );
};

export default LoginModal;
