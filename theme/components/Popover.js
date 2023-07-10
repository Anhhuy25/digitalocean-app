import { popoverAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const custom = definePartsStyle({
  content: defineStyle({
    w: "15.625rem",
    left: "0.625rem",
  }),
  body: defineStyle({
    w: "100%",
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
  }),
});

export const popoverTheme = defineMultiStyleConfig({
  variants: { custom },
});
