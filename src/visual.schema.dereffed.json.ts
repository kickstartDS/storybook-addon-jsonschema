import { JsonSchema1 } from "@kickstartds/json-schema-viewer/src/schema";

export const Schema: JsonSchema1 = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://frontend.ruhmesmeile.com/content/molecules/visual.schema.json",
  "title": "Visual",
  "description": "visual",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "height": {
      "title": "Height",
      "type": "string",
      "enum": [
        "small",
        "default",
        "fullImage",
        "fullScreen"
      ],
      "default": "default"
    },
    "media": {
      "title": "Media Wrapper",
      "description": "Wrapper for all media types",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "mode": {
          "title": "Media Type",
          "description": "Choose a media type between image, video and none",
          "type": "string",
          "enum": [
            "image",
            "video",
            "none"
          ],
          "default": "image"
        },
        "image": {
          "title": "Background image",
          "description": "Sources of background images for different screen sizes",
          "type": "object",
          "required": [
            "srcMobile",
            "srcTablet",
            "srcDesktop"
          ],
          "properties": {
            "srcMobile": {
              "title": "Mobile image source",
              "description": "Background image source for small screens",
              "type": "string",
              "format": "image",
              "default": "https://picsum.photos/seed/kdsvisual/640/270"
            },
            "srcTablet": {
              "title": "Tablet image source",
              "description": "Background image source for medium screens",
              "type": "string",
              "format": "image",
              "default": "https://picsum.photos/seed/kdsvisual/1280/540"
            },
            "srcDesktop": {
              "title": "Desktop image source",
              "description": "Background image source for large screens",
              "type": "string",
              "format": "image",
              "default": "https://picsum.photos/seed/kdsvisual/1920/810"
            },
            "src": {
              "title": "Optional source",
              "description": "Override for img tag of picture element, if needed",
              "type": "string",
              "format": "image",
              "default": "https://picsum.photos/seed/kdsvisual/640/270"
            },
            "indent": {
              "title": "Image indent",
              "description": "Choose to indent the image horizontally on small screens",
              "type": "string",
              "enum": [
                "none",
                "left",
                "right"
              ],
              "default": "none"
            },
            "alt": {
              "type": "string",
              "title": "Alt text",
              "description": "Alt text to display for picture"
            }
          }
        },
        "video": {
          "title": "Background video",
          "description": "Sources of background videos for different screen sizes",
          "type": "object",
          "required": [
            "srcMobile",
            "srcTablet",
            "srcDesktop"
          ],
          "properties": {
            "srcMobile": {
              "title": "Mobile video source",
              "description": "Background video source for small screens",
              "type": "string",
              "format": "video",
              "default": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4"
            },
            "srcTablet": {
              "title": "Tablet video source",
              "description": "Background video source for medium screens",
              "type": "string",
              "format": "video",
              "default": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4"
            },
            "srcDesktop": {
              "title": "Desktop video source",
              "description": "Background video source for large screens",
              "type": "string",
              "format": "video",
              "default": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4"
            }
          }
        }
      }
    },
    "overlay": {
      "title": "Grid layer",
      "description": "Enable grid layer",
      "type": "boolean",
      "default": false
    },
    "box": {
      "title": "Text box",
      "description": "Content and style configuration for the text box",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "enabled": {
          "title": "Display box",
          "description": "Toggles visibility of the box",
          "type": "boolean",
          "default": true
        },
        "headline": {
          "title": "Headline",
          "description": "Headline for the box",
          "type": "object",
          "$schema": "http://json-schema.org/draft-07/schema#",
          "$id": "http://frontend.ruhmesmeile.com/base/molecules/headline.schema.json",
          "required": [
            "level",
            "align",
            "spaceAfter"
          ],
          "properties": {
            "level": {
              "default": "p",
              "title": "Level",
              "description": "Select the headline level to use, or p alternatively",
              "type": "string",
              "enum": [
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "p"
              ]
            },
            "styleAs": {
              "default": "h2",
              "title": "Style",
              "description": "Select the headline style to use",
              "type": "string",
              "enum": [
                "none",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "p"
              ]
            },
            "align": {
              "default": null,
              "title": "Alignment",
              "description": "Choose an alignment for the headline",
              "type": "string",
              "enum": [
                "left",
                "center",
                "right"
              ]
            },
            "content": {
              "default": "Lorem Ipsum dolor",
              "title": "Text",
              "description": "Text content for the headline",
              "type": "string"
            },
            "subheadline": {
              "title": "Subheadline",
              "description": "Text content for the optional subheadline",
              "type": "string"
            },
            "spaceAfter": {
              "title": "Bottom spacing",
              "description": "Add additional spacing to the bottom of the headline",
              "type": "string",
              "enum": [
                "none",
                "small",
                "large"
              ],
              "default": "none"
            },
            "pageHeader": {
              "title": "Page header",
              "description": "Set the headline as a page header, triggering special css treatment",
              "type": "boolean",
              "default": false
            },
            "className": {
              "type": "string",
              "title": "Additional Classes",
              "description": "Add additional css classes that should be applied to the headline"
            }
          }
        },
        "text": {
          "title": "Text",
          "description": "Text box copy text",
          "type": "string",
          "format": "markdown",
          "default": "Hic maxime sed eos non. Consequatur ut qui amet accusantium nesciunt."
        },
        "link": {
          "title": "Link",
          "description": "Text box link configuration",
          "type": "object",
          "$schema": "http://json-schema.org/draft-07/schema#",
          "$id": "http://frontend.ruhmesmeile.com/base/atoms/link-button.schema.json",
          "definitions": {
            "href": {
              "type": "string",
              "title": "Button href?",
              "description": "Link used for button",
              "format": "uri",
              "default": "https://example.com"
            },
            "newTab": {
              "type": "boolean",
              "title": "Open link in new Tab",
              "description": "Open link in new Tab",
              "default": false
            }
          },
          "required": [
            "label",
            "variant",
            "size",
            "href"
          ],
          "additionalProperties": false,
          "properties": {
            "enabled": {
              "title": "Display Link",
              "description": "Toggles visibility of the link",
              "type": "boolean",
              "default": true
            },
            "variant": {
              "default": "outline-inverted",
              "type": "string",
              "enum": [
                "solid",
                "solid-inverted",
                "clear",
                "clear-inverted",
                "outline",
                "outline-inverted"
              ],
              "title": "Button Style",
              "description": "Choose one of the styles from the list"
            },
            "label": {
              "type": "string",
              "title": "Label",
              "description": "Text used on button",
              "default": "Lorem Ipsum"
            },
            "size": {
              "type": "string",
              "enum": [
                "small",
                "medium",
                "large"
              ],
              "default": "medium",
              "title": "Button Size",
              "description": "Choose a size between small, medium and large"
            },
            "className": {
              "type": "string",
              "title": "Additional Classes",
              "description": "Add additional css classes that should be applied to the button"
            },
            "icon": {
              "$schema": "http://json-schema.org/draft-07/schema#",
              "$id": "http://frontend.ruhmesmeile.com/base/atoms/icon.definitions.json",
              "title": "Icon",
              "description": "Icon",
              "type": "object",
              "properties": {
                "icon": {
                  "type": "string",
                  "title": "Icon identifier"
                },
                "role": {
                  "type": "string",
                  "title": "Aria role"
                },
                "className": {
                  "type": "string",
                  "title": "additional class"
                }
              }
            },
            "iconBefore": {
              "type": "boolean",
              "title": "Icon before button",
              "description": "Display icon before the button text",
              "default": false
            },
            "iconAfter": {
              "type": "boolean",
              "title": "Icon after button",
              "description": "Display icon after the button text",
              "default": false
            },
            "dataComponent": {
              "type": "string",
              "title": "`data-component` attribute",
              "description": "Overwrite the data-component to use for rendering"
            },
            "fillAnimation": {
              "type": "boolean",
              "default": false,
              "title": "Fill Animation",
              "description": "Add fill animation on hover"
            },
            "iconAnimation": {
              "type": "boolean",
              "default": false,
              "title": "Icon Animation",
              "description": "Add icon animation on hover"
            },
            "href": {
              "type": "string",
              "title": "Button href?",
              "description": "Link used for button",
              "format": "uri",
              "default": "https://example.com"
            },
            "newTab": {
              "type": "boolean",
              "title": "Open link in new Tab",
              "description": "Open link in new Tab",
              "default": false
            }
          }
        },
        "indent": {
          "title": "Indent",
          "description": "The text box is aligned inside the content grid",
          "type": "boolean",
          "default": false
        },
        "horizontal": {
          "title": "Horizontal orientation",
          "description": "Horizontal orientation of the box inside the keyvisual",
          "type": "string",
          "enum": [
            "left",
            "center",
            "right"
          ],
          "default": "left"
        },
        "vertical": {
          "title": "Vertical orientation",
          "description": "Vertical orientation of the box inside the keyvisual",
          "type": "string",
          "enum": [
            "top",
            "center",
            "bottom"
          ],
          "default": "center"
        },
        "background": {
          "title": "Style of the box",
          "description": "Choose a style for the box",
          "type": "string",
          "enum": [
            "default",
            "light",
            "transparent"
          ],
          "default": "default"
        }
      }
    },
    "backgroundColor": {
      "title": "Custom background color",
      "description": "Custom css background color",
      "type": "string",
      "format": "color",
      "examples": [
        "#000"
      ],
      "default": "#ccc"
    },
    "inbox": {
      "title": "Inbox",
      "description": "The text box is in front of the image on small screens",
      "type": "boolean",
      "default": false
    },
    "skipButton": {
      "title": "Skip Button",
      "description": "Show skip button",
      "type": "boolean",
      "default": false
    },
    "className": {
      "type": "string",
      "title": "Additional Classes"
    }
  }
}
