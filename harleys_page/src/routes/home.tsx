import { FC } from "react";
import Box from "../components/Box";
import Text from "../components/Text";
import { useAppSelector } from "../hooks/redux";

const Home: FC = () => {
  const auth = useAppSelector((state) => state.auth.loggedIn);

  return (
    <Box>
      <Text children="Welcome to Harley's Page" />
      <Text children={auth ? "Logged In" : "Not Logged In"} />
    </Box>
  );
};

export default Home;
