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
  inset: 0;

  > div {
    height: 100%;
  }
`;

export const Panel: React.FC<PanelProps> = (props) =>
  props.active ? (
    <PanelContainer>
      <AddonPanel {...props}>
        <MemoryRouter initialEntries={["/base"]}>
          <SchemaView />
        </MemoryRouter>
      </AddonPanel>
    </PanelContainer>
  ) : null;
