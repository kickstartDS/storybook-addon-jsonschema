declare module "global";

// TODO add better typings
declare module "@kickstartds/core/lib/storybook/helpers" {
  function pack(obj: Record<'string', any>): Record<'string', any>;
  function unpack(obj: Record<'string', any>): Record<'string', any>;
  function unpackDecorator(story: any, config: any);
};