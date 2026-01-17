import { render } from "@testing-library/react";
import App from "../App";
import { Provider } from "../components/ui/provider";

export const renderApp = () => {
  render(
    <Provider>
      <App />
    </Provider>
  );
};
