import { Variants } from "../src";

const test = true;
const variants = new Variants({
  base: "",
  variants: {
    size: {
      large: "super-large-class",
      middle: "middle-class",
      small: "small-class",
    },
    color: {
      black: "black-class",
      blue: "blue-class",
    },
  },
  default: {
    color: "blue",
    size: "middle",
  },
  compoundVariants: [
    ({ size, color }) => {
      if (size === "small" && color === "black") {
        if (test) {
          return "small-black-class black-class";
        }
      }
    },
    ({ size, color }) => {
      if (size === "middle" && color === "blue") {
        return "middle-blue-class";
      }

      return "";
    },
  ],
});

const size = "small";
const color = "black";

console.log(
  variants.forgeClasses({
    size,
    color,
  })
);
