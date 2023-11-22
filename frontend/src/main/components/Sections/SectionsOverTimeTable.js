import SectionsOverTimeTableBase from "main/components/SectionsOverTimeTableBase";

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

function getFirstVal(values) {
  return values[0];
}

function getCourseId(courseIds) {
  return courseIds[0].substring(0, courseIds[0].length - 2);
}

export default function SectionsOverTimeTable({ sections }) {
  // Stryker enable all
  // Stryker disable BooleanLiteral
  const columns = [
    {
      Header: "Quarter",
      accessor: (row) => yyyyqToQyy(row.courseInfo.quarter),
      disableGroupBy: true,
      id: "quarter",

      Cell: ({ cell: { value } }) => value,
    },
    {
      Header: "Course ID",
      accessor: "courseInfo.courseId",
      disableGroupBy: true,

      aggregate: getCourseId,
      Aggregated: ({ cell: { value } }) => `${value}`,

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
      Header: "Status",
      accessor: (row) => {
        if (isSectionCancelled(row.section)) return "CANCELLED";
        else if (isSectionClosed(row.section)) return "CLOSED";
        else if (isSectionFull(row.section)) return "FULL";
        else return "OPEN";
      },
      disableGroupBy: true,
      id: "status",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
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
    {
      Header: "Info",
      accessor: (row) => `/course/details/${row.courseInfo.quarter}/${row.section.enrollCode}`,
      disableGroupBy: true,

      aggregate: getFirstVal,
      Cell: ({ cell: { value } }) => (
        <Button
          variant="outline-dark"
          size="sm"
          href={value}
        >
          {"ⓘ"}
        </Button>
      ),
      Aggregated: ({ cell: { value } }) => (
        <Button
          variant="outline-light"
          size="sm"
          href={value}
        >
          {"ⓘ"}
        </Button>
      )
    },
  ];

  const testid = "SectionsOverTimeTable";

  const columnsToDisplay = columns;

  return (
    <SectionsOverTimeTableBase
      data={sections}
      columns={columnsToDisplay}
      testid={testid}
    />
  );
}
