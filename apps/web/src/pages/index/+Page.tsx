import { useTranslation } from "react-i18next";
import { css } from "../../../styled-system/css";
import { hstack, vstack } from "../../../styled-system/patterns";
import { useSnackbarStore } from "../../components/layout/Snackbar/Snackbar.store";
import Button from "../../components/utils/Button/Button";
// import ButtonWithLink from "../../components/utils/ButtonWithLink/ButtonWithLink";
import Card from "../../components/utils/Card/Card";

export { Page };

function Page() {
  const { t } = useTranslation();
  const addItem = useSnackbarStore(({ addItem }) => addItem);

  return (
    <>
      <Card withShadow>
        <div className={vstack({ gap: 2 })}>
          <h1 className={css({ textStyle: "title" })}>{t("app.title")}</h1>
          <p className={css({ textStyle: "body" })}>{t("app.description")}</p>
          <div className={hstack()}>
            <Button>Users</Button>
            <Button
              variant="danger"
              onClick={() =>
                addItem({
                  type: "danger",
                  message: "Je suis une longue notification",
                })
              }
            >
              Add snackbar item
            </Button>
            <Button
              variant="success"
              onClick={() =>
                addItem({
                  type: "success",
                  message: "Je suis une longue notification",
                })
              }
            >
              Add snackbar item
            </Button>
            <Button
              variant="warning"
              onClick={() =>
                addItem({
                  type: "warning",
                  message: "Je suis une longue notification",
                })
              }
            >
              Add snackbar item
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
