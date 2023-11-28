import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import mockConsole from "jest-mock-console";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { developerFixtures } from "fixtures/systemInfoFixtures";
import DeveloperPage from "main/pages/DeveloperPage";

describe("DeveloperPage tests", () => {
  const axiosMock = new AxiosMockAdapter(axios);

  beforeEach(() => {
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, developerFixtures);
  });

  test("renders without crashing", async () => {
    const queryClient = new QueryClient();
    axiosMock.onGet("/api/systemInfo").reply(200, developerFixtures);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <DeveloperPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(await screen.findByText("Commits")).toBeInTheDocument();
    expect(
      await screen.findByTestId("DeveloperTable-cell-row-0-col-commitSha"),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId(`DeveloperTable-cell-row-0-col-commitSha`),
    ).toHaveTextContent("4a3d0f9b2c23e2e4a1c1d3e4f5b6a7d8b9c0e1f2");
    expect(
      screen.getByTestId(`DeveloperTable-cell-row-0-col-commitMessage`),
    ).toHaveTextContent("Test commit message 1");
  });

  test("renders empty table when backend unavailable", async () => {
    const queryClient = new QueryClient();
    axiosMock.onGet("/api/systemInfo").timeout();

    const restoreConsole = mockConsole();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <DeveloperPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1);
    });

    restoreConsole();
  });
});
