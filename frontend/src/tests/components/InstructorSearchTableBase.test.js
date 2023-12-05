import { render, screen } from "@testing-library/react";
import {
  fiveSections,
  gigaSections,
  oneLectureSectionWithNoDiscussion,
} from "fixtures/sectionFixtures";
import InstructorSearchTableBase from "main/components/InstructorSearchTableBase";
import { yyyyqToQyy } from "main/utils/quarterUtilities.js";
import {
  convertToFraction,
  formatDays,
  formatInstructors,
  formatLocation,
  formatTime,
  isSection,
} from "main/utils/sectionUtils.js";

describe("InstructorSearchTableBase tests", () => {
  function getFirstVal(values) {
    return values[0];
  }

  const columns = [
    {
      Header: "Quarter",
      accessor: (row) => yyyyqToQyy(row.courseInfo.quarter),
      disableGroupBy: true,
      id: "quarter",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Course ID",
      accessor: "courseInfo.courseId",

      Cell: ({ cell: { value } }) => value.substring(0, value.length - 2),
    },
    {
      Header: "Title",
      accessor: "courseInfo.title",
      disableGroupBy: true,

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      // Stryker disable next-line StringLiteral: this column is hidden, very hard to test
      Header: "Is Section?",
      accessor: (row) => isSection(row.section.section),
      // Stryker disable next-line StringLiteral: this column is hidden, very hard to test
      id: "isSection",
    },
    {
      Header: "Enrolled",
      accessor: (row) =>
        convertToFraction(row.section.enrolledTotal, row.section.maxEnroll),
      disableGroupBy: true,
      id: "enrolled",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Location",
      accessor: (row) => formatLocation(row.section.timeLocations),
      disableGroupBy: true,
      id: "location",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Days",
      accessor: (row) => formatDays(row.section.timeLocations),
      disableGroupBy: true,
      id: "days",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Time",
      accessor: (row) => formatTime(row.section.timeLocations),
      disableGroupBy: true,
      id: "time",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Instructor",
      accessor: (row) => formatInstructors(row.section.instructors),
      disableGroupBy: true,
      id: "instructor",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Enroll Code",
      accessor: "section.enrollCode",
      disableGroupBy: true,

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
  ];

  test("renders an empty table without crashing", () => {
    render(
      <InstructorSearchTableBase columns={columns} data={[]} group={false} />,
    );
  });

  test("renders an full table without crashing", () => {
    render(
      <InstructorSearchTableBase
        columns={columns}
        data={gigaSections}
        group={false}
      />,
    );
  });

  test("renders a single lecture section correctly", async () => {
    render(
      <InstructorSearchTableBase
        columns={columns}
        data={oneLectureSectionWithNoDiscussion}
        group={false}
      />,
    );
  });

  test("renders five sections correctly", async () => {
    render(
      <InstructorSearchTableBase
        columns={columns}
        data={fiveSections}
        group={false}
      />,
    );

    expect(screen.queryByText("Is Section?")).not.toBeInTheDocument();
    expect(
      screen.getByTestId("testid-cell-row-1-col-courseInfo.courseId"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("testid-cell-row-0-col-courseInfo.courseId"),
    ).toHaveAttribute(
      "style",
      "background: rgb(52, 133, 155); color: rgb(239, 252, 244); font-weight: bold;",
    );
  });
});
