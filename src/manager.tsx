import React from "react";
import { addons, types } from "@storybook/manager-api";

import { ADDON_ID, PANEL_ID } from "./constants";
import { Panel } from "./Panel";

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    id: ADDON_ID,
    title: "JSON Schema",
    match: ({ viewMode }) => viewMode === "story",
    render: ({ active }) => <Panel active={active} />,
  });
});
