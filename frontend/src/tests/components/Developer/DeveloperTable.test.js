import { render, screen } from "@testing-library/react";
import { developerFixtures } from "fixtures/systemInfoFixtures";
import DeveloperTable from "main/components/Developer/DeveloperTable";

describe("UserTable tests", () => {
  test("renders without crashing for empty table", () => {
    render(<DeveloperTable commits={[]} />);
  });

  test("renders without crashing for fixture", () => {
    render(<DeveloperTable commits={developerFixtures} />);
  });

  test("Has the expected colum headers and content", () => {
    render(<DeveloperTable commits={developerFixtures} />);

    const expectedHeaders = ["Commit Sha", "Commit message"];
    const expectedFields = ["commitSha", "commitMessage"];
    const testId = "DeveloperTable";

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(screen.getByTestId(`${testId}-cell-row-0-col-commitSha`)).toHaveTextContent(
      "4a3d0f9b2c23e2e4a1c1d3e4f5b6a7d8b9c0e1f2"
    );
    expect(screen.getByTestId(`${testId}-cell-row-0-col-commitMessage`)).toHaveTextContent(
      "Test commit message 1"
    );
  });
});
