export { getTitle };

function getTitle(pageContext: { config: { title: unknown } }) {
  // The value exported by /pages/**/+title.js is available at pageContext.config.title
  const val = pageContext.config.title;

  if (!val) return "Some default title";

  if (typeof val === "string") return val;
  if (typeof val === "function") return val(pageContext);
}
