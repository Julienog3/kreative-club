import { usePageContext } from "vike-react/usePageContext";
import { css } from "../../../../styled-system/css";

export { Page };

function Page(): JSX.Element {
  const pageContext = usePageContext();

  return (
    <div className={css({ p: "1rem", maxWidth: "1440px" })}>
      <h2 className={css({ textStyle: "title", mb: "1.5rem" })}>
        Créatif {pageContext?.routeParams?.id}
      </h2>
    </div>
  );
}
