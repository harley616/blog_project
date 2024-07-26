import { FC } from "react";
import Root from "./routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
const App: FC = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default App;
