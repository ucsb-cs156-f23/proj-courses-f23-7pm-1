import React from "react";

import UpdateFinalsJobForm from "main/components/Jobs/UpdateFinalsJobForm";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

export default {
  title: "components/Jobs/UpdateFinalsJobForm",
  component: UpdateFinalsJobForm,
  parameters: {
    mockData: [
      {
        url: "/api/systemInfo",
        method: "GET",
        status: 200,
        response: systemInfoFixtures.showingBoth,
      },
    ],
  },
};

const Template = (args) => {
  return <UpdateFinalsJobForm {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  callback: (data) => {
    console.log("Submit was clicked, data=", data);
  },
};
