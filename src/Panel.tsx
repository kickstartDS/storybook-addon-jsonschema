import React from "react";
import { MemoryRouter } from "react-router-dom";
import { AddonPanel } from "@storybook/components";
import styled from "styled-components";
import { SchemaView } from "./components/SchemaView";

interface PanelProps {
  active: boolean;
}

const PanelContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;

  > div {
    height: 100%;
  }
`;

export const Panel: React.FC<PanelProps> = (props) => (
  <PanelContainer hidden={!props.active}>
    <AddonPanel {...props}>
      <MemoryRouter initialEntries={["/base"]}>
        <SchemaView />
      </MemoryRouter>
    </AddonPanel>
  </PanelContainer>
);
