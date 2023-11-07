import { hstack, vstack } from "../../styled-system/patterns";
import { css } from "../../styled-system/css";
import Card from "../components/utils/Card/Card";
import ButtonWithLink from "../components/utils/ButtonWithLink/ButtonWithLink";
import { useTranslation } from "react-i18next";

function HomePage(): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <Card>
        <div className={vstack({ gap: 2 })}>
          <h1 className={css({ textStyle: "title" })}>{t("app.title")}</h1>
          <p className={css({ textStyle: "body" })}>{t("app.description")}</p>
          <div className={hstack()}>
            <ButtonWithLink to="/users">Users</ButtonWithLink>
            <ButtonWithLink to="/users/add">Add user</ButtonWithLink>
          </div>
        </div>
      </Card>
    </>
  );
}

export default HomePage;
