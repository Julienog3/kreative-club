import { useEffect } from "react";
import { css } from "../../../../styled-system/css";

export { Page };

interface PageProps {
  id: string;
}

function Page({ id }: PageProps): JSX.Element {
  useEffect(() => {
    console.log("id", id);
  }, []);

  return (
    <div className={css({ p: "1rem", maxWidth: "1440px" })}>
      <h2 className={css({ textStyle: "title", mb: "1.5rem" })}>
        Créatif {id}
      </h2>
    </div>
  );
}
