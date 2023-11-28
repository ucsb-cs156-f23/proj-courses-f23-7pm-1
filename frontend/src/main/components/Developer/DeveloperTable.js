import React from "react";
import OurTable from "main/components/OurTable";

const columns = [
  {
    Header: "Commit Sha",
    accessor: "commitSha",
  },
  {
    Header: "Commit message",
    accessor: "commitMessage",
  },
];

export default function DeveloperTable({ commits }) {
  return (
    <OurTable data={[commits]} columns={columns} testid={"DeveloperTable"} />
  );
}
