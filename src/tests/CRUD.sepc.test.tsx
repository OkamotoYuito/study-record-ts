import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderApp } from "./renderApp";
import userEvent from "@testing-library/user-event";
import { mockRecords } from "./mockRecords";

jest.mock("../server/supabaseClient");

const mockAddRecord = jest.fn();

jest.mock("../hooks/useRecords", () => ({
  useRecords: () => ({
    records: mockRecords,
    isLoading: false,
    error: null,
    addRecord: mockAddRecord,
    deleteRecord: jest.fn(),
  }),
}));

describe("CRUD Tests", () => {
  it("Modal Title", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByText("新規登録"));
    expect(
      screen.getByRole("heading", { name: "新規登録" })
    ).toBeInTheDocument();
  });

  it("addRecord function is called", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByText("新規登録"));
    await user.type(screen.getByLabelText("学習内容"), "テスト");
    await user.type(screen.getByLabelText("学習時間"), "3");
    await user.click(screen.getByText("登録"));

    expect(mockAddRecord).toHaveBeenCalledTimes(1);
  });

  it("validation test", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByText("新規登録"));
    const titleInput = screen.getByLabelText("学習内容");
    const timeInput = screen.getByLabelText("学習時間");

    await user.click(titleInput);
    await user.click(timeInput);
    await user.click(titleInput);

    expect(await screen.findByText("内容の入力は必須です")).toBeInTheDocument();
  });
});
