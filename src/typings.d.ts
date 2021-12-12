declare module "global";

interface Args {
  [key: string]: any;
}

// TODO add better typings
declare module "@kickstartds/core/lib/storybook/helpers" {
  function pack(obj: Args): Args;
  function unpack(obj: Args): Args;
  function unpackDecorator(story: any, config: any);
};
