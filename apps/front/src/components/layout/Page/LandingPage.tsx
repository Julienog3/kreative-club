import { css } from "../../../../styled-system/css";
import { circle, vstack } from "../../../../styled-system/patterns";
import { AuthModalType } from "../../modals/AuthModal/AuthModal";
import { useStoreAuthModal } from "../../modals/AuthModal/AuthModal.store";
import Button from "../../utils/Button/Button";

const LandingPage = (): JSX.Element => {
  const openModal = useStoreAuthModal(({ openModal }) => openModal);

  return (
    <div
      className={vstack({
        minHeight: "100vh",
        bg: "cyan",
        position: "relative",
      })}
    >
      <div
        className={vstack({
          minHeight: "90vh",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "10",
        })}
      >
        <h1 className={css({ textStyle: "title", textAlign: "center" })}>
          Créez votre vision, choisissez votre talent
        </h1>
        <p
          className={css({
            textStyle: "body",
            textAlign: "center",
            maxWidth: "50%",
          })}
        >
          Mauris scelerisque, lectus nec egestas cursus, est erat tempor lorem,
          ac tristique ipsum odio et felis. Suspendisse ac vulputate ligula.
          Nulla id arcu accumsan, vulputate nisl sed, consequat odio.
        </p>

        <Button onClick={() => openModal(AuthModalType.SIGNUP)}>
          <p className={css({ textStyle: "body", fontSize: "1.25rem" })}>
            Rejoindre le club
          </p>
        </Button>
      </div>
      <div
        className={vstack({
          position: "absolute",
          top: "4rem",
          left: "8rem",
          rotate: "-15deg",
          zIndex: "10",
        })}
      >
        <img
          className={circle({
            w: "8rem",
            h: "8rem",
            border: "2px solid #000",
            objectFit: "cover",
          })}
          src="/images/person1.png"
          alt=""
        />
        <span
          className={css({
            position: "absolute",
            bottom: "-1.5rem",
            textStyle: "body",
            border: "2px solid #000",
            cursor: "pointer",
            padding: ".5rem",
            whiteSpace: "nowrap",
            transition: "background",
            rounded: "999px",
            color: "black",
            bg: "yellow",
          })}
        >
          Vincent Lacoste
        </span>
      </div>

      <div
        className={vstack({
          position: "absolute",
          bottom: "12rem",
          right: "10rem",
          rotate: "15deg",
          zIndex: "10",
        })}
      >
        <img
          className={circle({
            w: "8rem",
            h: "8rem",
            border: "2px solid #000",
            objectFit: "cover",
          })}
          src="/images/person2.png"
          alt=""
        />
        <span
          className={css({
            position: "absolute",
            bottom: "-1.5rem",
            textStyle: "body",
            border: "2px solid #000",
            cursor: "pointer",
            padding: ".5rem",
            whiteSpace: "nowrap",
            transition: "background",
            rounded: "999px",
            color: "black",
            bg: "yellow",
          })}
        >
          Anna Ngoma
        </span>
      </div>
      <img
        className={css({
          position: "absolute",
          right: "0",
          height: "100%",
        })}
        src="/images/svg/curve.svg"
        alt=""
      />
    </div>
  );
};

export default LandingPage;
