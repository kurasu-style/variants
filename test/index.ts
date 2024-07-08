import { type VariantsType, Variants } from "../src";

const variants = new Variants({
  base: "btn",
  variants: {
    size: {
      sm: "btn-sm",
      lg: "btn-lg",
    },
    color: {
      primary: "btn-primary",
      secondary: "btn-secondary",
    },
  },
  default: {
    size: "sm",
    color: "primary",
  },
});

type Size = keyof VariantsType<typeof variants.getVariants>["size"];

const size: Size = "lg";

console.log(size);
