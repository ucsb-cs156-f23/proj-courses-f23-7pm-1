import React from "react";

import DeveloperTable from "main/components/Developer/DeveloperTable";
import { developerFixtures } from "fixtures/systemInfoFixtures";

export default {
  title: "components/Developer/DeveloperTable",
  component: DeveloperTable,
};

const Template = (args) => {
  return <DeveloperTable {...args} />;
};

export const Empty = Template.bind({});

Empty.args = {
  commits: [],
};

export const developerFix = Template.bind({});

developerFix.args = {
  commits: developerFixtures,
};
