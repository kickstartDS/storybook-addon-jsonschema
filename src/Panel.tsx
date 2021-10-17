import React from "react";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";

import { useAddonState, useChannel } from "@storybook/api";
import { AddonPanel } from "@storybook/components";

import { ADDON_ID, EVENTS } from "./constants";
import { SchemaView } from "./SchemaView";

export class DebuggingMemoryRouter extends MemoryRouter {
  constructor(props: MemoryRouterProps) {
    super(props);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).history.listen((location: any, action: any) => { // tslint:disable-line:no-any
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log(`The last navigation action was ${action}`, JSON.stringify((this as any).history, null, 2));
    });
  }
}

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  const [results, setState] = useAddonState(ADDON_ID, {
    danger: [],
    warning: [],
  });

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [EVENTS.RESULT]: (newResults) => setState(newResults),
  });

  return (
    <AddonPanel {...props}>
      <DebuggingMemoryRouter initialEntries={['/base']} >
        <SchemaView />
      </DebuggingMemoryRouter>
    </AddonPanel>
  );
};
