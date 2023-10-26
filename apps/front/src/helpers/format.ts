const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

const parseCamelToSnakeCase = (object: { [key: string]: unknown; }) => {
  return Object.fromEntries(
    Object
      .entries(object)
      .map(([k, v]) => [camelToSnakeCase(k), v]),
  );
}
export { parseCamelToSnakeCase }