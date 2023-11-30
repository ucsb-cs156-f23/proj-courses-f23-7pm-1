import { yyyyqToQyy } from "main/utils/quarterUtilities.js";

import {
  convertToFraction,
  formatDays,
  formatInstructors,
  formatLocation,
  formatTime,
  isSection,
  isSectionCancelled,
  isSectionClosed,
  isSectionFull,
} from "main/utils/sectionUtils.js";
import { Button } from "react-bootstrap";
import InstructorSearchTableBase from "../InstructorSearchTableBase";

export default function InstructorSearchTable({ sections }) {
  // Stryker enable all
  // Stryker disable BooleanLiteral
  const columns = [
    {
      Header: "Quarter",
      accessor: (row) => yyyyqToQyy(row.courseInfo.quarter),
      disableGroupBy: true,
      id: "quarter",
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
    },
    {
      // Stryker disable next-line StringLiteral: this column is hidden, very hard to test
      Header: "Is Section?",
      accessor: (row) => isSection(row.section.section),
      // Stryker disable next-line StringLiteral: this column is hidden, very hard to test
      id: "isSection",
    },
    {
      Header: "Status",
      accessor: (row) => {
        if (isSectionCancelled(row.section)) return "CANCELLED";
        else if (isSectionClosed(row.section)) return "CLOSED";
        else if (isSectionFull(row.section)) return "FULL";
        else return "OPEN";
      },
      disableGroupBy: true,
      id: "status",
    },
    {
      Header: "Enrolled",
      accessor: (row) =>
        convertToFraction(row.section.enrolledTotal, row.section.maxEnroll),
      disableGroupBy: true,
      id: "enrolled",
    },
    {
      Header: "Location",
      accessor: (row) => formatLocation(row.section.timeLocations),
      disableGroupBy: true,
      id: "location",
    },
    {
      Header: "Section Number",
      accessor: (row) => row.section.section,
      // Stryker disable next-line StringLiteral: this column is hidden, very hard to test
      id: "sectionNumber",
    },
    {
      Header: "Days",
      accessor: (row) => formatDays(row.section.timeLocations),
      disableGroupBy: true,
      id: "days",
    },
    {
      Header: "Time",
      accessor: (row) => formatTime(row.section.timeLocations),
      disableGroupBy: true,
      id: "time",
    },
    {
      Header: "Instructor",
      accessor: (row) => formatInstructors(row.section.instructors),
      disableGroupBy: true,
      id: "instructor",
    },
    {
      Header: "Enroll Code",
      accessor: "section.enrollCode",
      disableGroupBy: true,
    },
    {
      Header: "Info",
      accessor: (row) =>
        `/coursedetails/${row.courseInfo.quarter}/${row.section.enrollCode}`,
      disableGroupBy: true,
      id: "info",

      Cell: ({ cell: { value } }) => (
        <Button variant="outline-dark" size="sm" href={value}>
          ⓘ
        </Button>
      ),
    },
  ];

  const testid = "InstructorSearchTable";

  const columnsToDisplay = columns;

  return (
    <InstructorSearchTableBase
      data={sections}
      columns={columnsToDisplay}
      testid={testid}
    />
  );
}
