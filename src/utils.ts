export type ClassValue =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | Record<string, boolean>;

const toValue = (input: ClassValue): string => {
  if (
    typeof input === "string" ||
    typeof input === "number" ||
    typeof input === "bigint"
  ) {
    return `${input}`;
  }

  if (typeof input === "object" && input !== null && !Array.isArray(input)) {
    return Object.keys(input)
      .filter((key) => input[key])
      .join(" ");
  }

  return "";
};

export const cn = (...inputs: ClassValue[]): string => {
  const classSet = new Set<string>();

  inputs.forEach((input) => {
    if (input !== null && input !== undefined) {
      const value = toValue(input);

      if (value) {
        classSet.add(value);
      }
    }
  });

  return Array.from(classSet).join(" ");
};
