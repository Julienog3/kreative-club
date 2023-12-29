import { css } from "../../../styled-system/css";
import { hstack, vstack } from "../../../styled-system/patterns";
import { useSnackbarStore } from "../../components/layout/Snackbar/Snackbar.store";
import Button from "../../components/utils/Button/Button";
import Card from "../../components/utils/Card/Card";
import ButtonWithLink from "../../components/utils/ButtonWithLink/ButtonWithLink";

export { Page };

function Page() {
  const addItem = useSnackbarStore(({ addItem }) => addItem);

  return (
    <>
      <Card withShadow>
        <div className={vstack({ gap: 2 })}>
          <h1 className={css({ textStyle: "title" })}>Kreative club</h1>
          <p className={css({ textStyle: "body" })}>
            Plateforme de freelance pour graphiste
          </p>
          <div className={hstack()}>
            <ButtonWithLink to="/users">Users</ButtonWithLink>
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
