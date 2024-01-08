import { css } from "../../../styled-system/css";
import { hstack, vstack } from "../../../styled-system/patterns";
import { AuthModalType } from "../../components/modals/AuthModal/AuthModal";
import { useStoreAuthModal } from "../../components/modals/AuthModal/AuthModal.store";
import Button from "../../components/utils/Button/Button";

export { Page };

function Page() {
  const openModal = useStoreAuthModal(({ openModal }) => openModal);

  return (
    <div
      className={vstack({
        width: "100%",
        bg: "cyan",
        position: "relative",
      })}
    >
      <div className={hstack({ maxWidth: "1440px" })}>
        <div
          className={vstack({
            minHeight: "100vh",
            alignItems: "start",
            justifyContent: "center",
          })}
        >
          <h1 className={css({ textStyle: "title" })}>
            Créez votre vision, choisissez votre talent
          </h1>
          <p
            className={css({
              textStyle: "body",
            })}
          >
            Mauris scelerisque, lectus nec egestas cursus, est erat tempor
            lorem, ac tristique ipsum odio et felis. Suspendisse ac vulputate
            ligula. Nulla id arcu accumsan, vulputate nisl sed, consequat odio.
          </p>

          <Button onClick={() => openModal(AuthModalType.SIGNUP)}>
            <p className={css({ textStyle: "body", fontSize: "1.25rem" })}>
              Rejoindre le club
            </p>
          </Button>
        </div>
        <img
          className={css({
            // position: "absolute",
            width: "40%",
            // height: "0%",
          })}
          src="/images/mascot.png"
          alt=""
        />
      </div>
    </div>
  );
}
