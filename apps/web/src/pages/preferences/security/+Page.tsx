import Card from "../../../components/utils/Card/Card";

import { PreferencesLayout } from "../../../components/layout/PreferencesLayout/PreferencesLayout";
import { vstack } from "../../../../styled-system/patterns";

export { Page };

function Page(): JSX.Element {
  return (
    <>
      <PreferencesLayout>
        <Card css={{ width: "100%", height: "100%" }}>
          <div
            className={vstack({
              w: "100%",
              alignItems: "flex-start",
              p: "1rem",
              height: "100%",
            })}
          >
            <h1>Sécurité</h1>
          </div>
        </Card>
      </PreferencesLayout>
    </>
  );
}
