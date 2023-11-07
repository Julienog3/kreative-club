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
