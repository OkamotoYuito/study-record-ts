import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as useRecordsModule from "../hooks/useRecords";
import { renderApp } from "./renderApp";
import { mockRecords } from "./mockRecords";

jest.mock("../server/supabaseClient");

describe("App Integration Tests", () => {
  let mockIsLoading = false;

  beforeEach(() => {
    mockIsLoading = false;

    jest.spyOn(useRecordsModule, "useRecords").mockImplementation(() => ({
      records: mockRecords,
      isLoading: mockIsLoading,
      error: null,
      addRecord: jest.fn(),
      deleteRecord: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Loading Screen", () => {
    it("should show loading", () => {
      mockIsLoading = true;

      renderApp();

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  describe("Layout", () => {
    it("should render title", () => {
      renderApp();

      expect(
        screen.getByText("Study Record with TypeScript")
      ).toBeInTheDocument();
    });

    it("should register button", () => {
      renderApp();
      expect(screen.getByText("新規登録")).toBeInTheDocument();
    });

    it("should record list", () => {
      renderApp();

      expect(
        screen.getByText(`${mockRecords[0].title}：${mockRecords[0].time}時間`)
      ).toBeInTheDocument();
    });
  });
});
