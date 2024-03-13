import Card from "#root/src/components/utils/Card/Card";
import { css } from "#root/styled-system/css";
import { vstack } from "#root/styled-system/patterns";

export { Page };

function Page() {
  return (
    <Card css={{ width: "100%", height: "100%" }}>
      <div
        className={vstack({
          w: "100%",
          alignItems: "flex-start",
          p: "1rem",
          height: "100%",
        })}
      >
        <h2 className={css({ textStyle: "subtitle" })}>Général</h2>
      </div>
    </Card>
  );
}
