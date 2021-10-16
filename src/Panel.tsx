import React from "react";
import { useAddonState, useChannel } from "@storybook/api";
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, EVENTS } from "./constants";
import { SchemaEditor, SchemaViewWR, SchemaExplorer, SchemaExplorerProps, InternalLookup, IdLookup, generateJsonExampleFor } from "@kickstartds/json-schema-viewer";
import { Schema as VisualSchema } from './visual.schema.dereffed.json';

import { MemoryRouter, MemoryRouterProps, BrowserRouter } from 'react-router-dom';

export class DebuggingMemoryRouter extends MemoryRouter {
  constructor(props: MemoryRouterProps) {
    console.log('DebuggingMemoryRouter: starting MemoryRouter', props);
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

  const defaultArgs: Partial<SchemaExplorerProps> = {
    basePathSegments: ['view'],
    path: [{ title: 'object', reference: '#' }],
    lookup: new IdLookup(),
    stage: 'both'
  };

  const schema = VisualSchema;
  const lookup = new InternalLookup(schema);

  const finalArgs = {
    ...defaultArgs,
    path: [{
        title: schema.title || 'object',
    }],
    lookup,
    schema,
    stage: 'both'
  }

  const { value: fullExample } = generateJsonExampleFor(schema, lookup, 'both');

  return (
    <AddonPanel {...props}>
      <DebuggingMemoryRouter initialEntries={['/']} >
        <SchemaViewWR.Container>
          <SchemaExplorer {...finalArgs} />
          <SchemaViewWR.EditorContainer>
            <SchemaEditor
              initialContent={fullExample}
              schema={schema}
            />
          </SchemaViewWR.EditorContainer>
        </SchemaViewWR.Container>
      </DebuggingMemoryRouter>
    </AddonPanel>
  );
};
