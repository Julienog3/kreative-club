import { PropsWithChildren } from "react";
import { css } from "../../../../styled-system/css";
import { SpringValue, animated } from "@react-spring/web";
import { hstack, vstack } from "../../../../styled-system/patterns";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";

export interface ModalProps {
  title: string;
  style: ModalStyle;
  onClose: () => void;
}

export type ModalStyle = {
  y: SpringValue<number>;
  opacity: SpringValue<number>;
};

export const modalTransitionConfig = {
  from: {
    y: 0,
    opacity: 0,
  },
  enter: {
    y: -10,
    opacity: 1,
  },
  leave: {
    y: 0,
    opacity: 0,
  },
  config: {
    duration: 200,
  },
};

const Modal = ({
  title,
  style,
  onClose,
  children,
}: ModalProps & PropsWithChildren): JSX.Element => {
  const { t } = useTranslation();
  // const closeModal = useStoreModal(({ closeModal }) => closeModal);

  return (
    <animated.div
      style={{ opacity: style.opacity }}
      className={css({
        zIndex: 10,
        w: "100%",
        minHeight: "screen",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <animated.div
        style={{ y: style.y }}
        role="dialog"
        className={css({
          border: "3px solid #000",
          boxShadow: "4px 4px 0px #000",
          borderRadius: "13px",
          bgColor: "#fff",
          padding: "1.5rem",
          w: "30vw",
        })}
      >
        <div
          className={hstack({
            justifyContent: "space-between",
            alignItems: "center",
            mb: "1rem",
          })}
        >
          <h2 className={css({ textStyle: "title" })}>{t(title)}</h2>
          <Button variant="danger" onClick={onClose}>
            <AiOutlineClose />
          </Button>
        </div>
        <div className={vstack()}>{children}</div>
      </animated.div>
    </animated.div>
  );
};

export default Modal;
