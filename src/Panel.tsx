import React from "react";
import { MemoryRouter } from "react-router-dom";
import { AddonPanel } from "@storybook/components";
import { SchemaView } from "./components/SchemaView";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => (
  <AddonPanel {...props}>
    <MemoryRouter initialEntries={['/base']} >
      <SchemaView />
    </MemoryRouter>
  </AddonPanel>
);
