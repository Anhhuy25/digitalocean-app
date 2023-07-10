import { extendTheme } from "@chakra-ui/react";
import { inputTheme } from "./components/Input";
import { textareaTheme } from "./components/Textarea";
import { popoverTheme } from "./components/Popover";

export const theme = extendTheme({
  components: {
    Input: inputTheme,
    Textarea: textareaTheme,
    Popover: popoverTheme,
  },
  colors: {
    red: {
      500: "#E53E3E",
    },
  },
  fontSizes: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
    "2xl": "2rem",
  },
});
