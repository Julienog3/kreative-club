import { useTranslation } from "react-i18next";
import { css } from "../../../styled-system/css"
import { hstack, vstack } from "../../../styled-system/patterns"
import Card from "../../components/utils/Card/Card"
import Button from "../../components/utils/Button/Button";
import { useSnackbarStore } from "../../components/layout/Snackbar/Snackbar.store";

function Page(): JSX.Element {
  const { t } = useTranslation();
  const addItem = useSnackbarStore(({ addItem }) => addItem);

  return (
    <>
      <Card withShadow>
        <div className={vstack({ gap: 2 })}>
          <h1 className={css({ textStyle: "title" })}>{t("app.title")}</h1>
          <p className={css({ textStyle: "body" })}>{t("app.description")}</p>
          <div className={hstack()}>
            {/* <ButtonWithLink to="/users">Users</ButtonWithLink> */}
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
  )
}

export { Page }