const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const parseCamelToSnakeCase = (object: { [key: string]: unknown }) => {
  return Object.fromEntries(
    Object.entries(object).map(([k, v]) => [camelToSnakeCase(k), v]),
  );
};

export const toCamelCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
};

const isArray = function (a: unknown) {
  return Array.isArray(a);
};

const isObject = function (o: unknown) {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const keysToCamel = function (o: { [key: string]: any }) {
  if (isObject(o)) {
    const n: { [key: string]: unknown } = {};

    Object.keys(o).forEach((k) => {
      n[toCamelCase(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i: never) => {
      return keysToCamel(i);
    });
  }

  return o;
};
