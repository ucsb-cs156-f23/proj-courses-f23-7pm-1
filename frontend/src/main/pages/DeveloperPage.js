import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import DeveloperTable from "main/components/Developer/DeveloperTable";

import { useBackend } from "main/utils/useBackend";
const DeveloperPage = () => {
  const {
    data: commits,
    error: _error,
    status: _status,
  } = useBackend(
    // Stryker disable next-line all : don't test internal caching of React Query
    ["/api/systemInfo"],
    {
      // Stryker disable next-line StringLiteral : GET is default, so replacing with "" is an equivalent mutation
      method: "GET",
      url: "/api/systemInfo",
    },
    [],
  );

  return (
    <BasicLayout>
      <h2>Commits</h2>
      <DeveloperTable commits={commits} />
    </BasicLayout>
  );
};

export default DeveloperPage;
