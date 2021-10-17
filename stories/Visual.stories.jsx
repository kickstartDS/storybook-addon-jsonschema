import { pack } from "@kickstartds/core/lib/storybook/helpers";
import visualStories, {
  Template,
} from "@kickstartds/content/lib/visual/visual.stories";

export default visualStories;

export const BoxHell = Template.bind({});
BoxHell.args = pack({
  height: "default",
  box: {
    enabled: true,
    horizontal: "left",
    vertical: "center",
    background: "light",
    headline: {
      level: "p",
      styleAs: "h2",
      align: "left",
      content: "Lorem Ipsum dolor",
      spaceAfter: "none",
      pageHeader: false
    },
    text: "Hic maxime sed eos non. Consequatur ut qui amet accusantium nesciunt.",
    link: {
      variant: "outline",
      fillAnimation: true,
    },
  },
  media: {
    mode: "image",
    image: {
      srcMobile: "https://picsum.photos/seed/kdsvisual/640/270",
      srcTablet: "https://picsum.photos/seed/kdsvisual/1280/540",
      srcDesktop: "https://picsum.photos/seed/kdsvisual/1920/810",
      indent: "none",
    },
  },
});

export const BoxDunkel = Template.bind({});
BoxDunkel.args = pack({
  height: "default",
  box: {
    enabled: true,
    horizontal: "left",
    vertical: "center",
    background: "dark",
    headline: {
      level: "p",
      styleAs: "h2",
      align: "left",
      content: "Lorem Ipsum dolor",
      spaceAfter: "none",
      pageHeader: false
    },
    text: "Hic maxime sed eos non. Consequatur ut qui amet accusantium nesciunt.",
    link: {
      variant: "outline-inverted",
      fillAnimation: true,
    },
  },
  media: {
    mode: "image",
    image: {
      srcMobile: "https://picsum.photos/seed/kdsvisual/640/270",
      srcTablet: "https://picsum.photos/seed/kdsvisual/1280/540",
      srcDesktop: "https://picsum.photos/seed/kdsvisual/1920/810",
      indent: "none",
    },
  },
});

export const BoxTransparentMitOverlay = Template.bind({});
BoxTransparentMitOverlay.args = pack({
  height: "default",
  overlay: true,
  box: {
    enabled: true,
    horizontal: "left",
    vertical: "center",
    background: "transparent",
    headline: {
      level: "p",
      styleAs: "h2",
      align: "left",
      content: "Lorem Ipsum dolor",
      spaceAfter: "none",
      pageHeader: false
    },
    text: "Hic maxime sed eos non. Consequatur ut qui amet accusantium nesciunt.",
    link: {
      variant: "outline-inverted",
      fillAnimation: true,
    },
  },
  media: {
    mode: "image",
    image: {
      srcMobile: "https://picsum.photos/seed/kdsvisual/640/270",
      srcTablet: "https://picsum.photos/seed/kdsvisual/1280/540",
      srcDesktop: "https://picsum.photos/seed/kdsvisual/1920/810",
      indent: "none",
    },
  },
});

export const VideoMitOverlay = Template.bind({});
VideoMitOverlay.args = pack({
  height: "default",
  overlay: true,
  skipButton: true,
  box: {
    enabled: true,
    horizontal: "center",
    vertical: "center",
    background: "transparent",
    headline: {
      level: "p",
      styleAs: "h2",
      align: "left",
      content: "Lorem Ipsum dolor",
      spaceAfter: "none",
      pageHeader: false
    },
    text: "Hic maxime sed eos non. Consequatur ut qui amet accusantium nesciunt.",
    link: {
      variant: "outline-inverted",
      fillAnimation: true,
    },
  },
  media: {
    mode: "video",
    image: {
      srcMobile: "https://picsum.photos/seed/kdsvisual/640/270",
      srcTablet: "https://picsum.photos/seed/kdsvisual/1280/540",
      srcDesktop: "https://picsum.photos/seed/kdsvisual/1920/810",
      indent: "none",
    },
    video: {
      srcMobile: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      srcTablet: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      srcDesktop: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
  },
});
