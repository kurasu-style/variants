const toValue = (input) => {
  let result = "";

  if (
    typeof input === "string" ||
    typeof input === "number" ||
    typeof input === "bigint"
  ) {
    result += input;
  }

  if (typeof input === "object" && input !== null && !Array.isArray(input)) {
    for (let key in input) {
      if (input[key]) {
        if (result) {
          result += " ";
        }
        result += key;
      }
    }
  }

  return result;
};

export const cn = (...inputs) => {
  let result = "";

  for (let input of inputs) {
    if (input !== null && input !== undefined) {
      let value = toValue(input);

      if (typeof value === "string") {
        if (result) {
          result += " ";
        }
        result += value;
      }
    }
  }

  return result;
};
