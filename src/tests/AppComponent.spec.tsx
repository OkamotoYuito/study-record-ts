import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { Provider } from "../components/ui/provider";

describe("title", () => {
  it("should render title", () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    expect(
      screen.getByText("Study Record with TypeScript")
    ).toBeInTheDocument();
  });
});
