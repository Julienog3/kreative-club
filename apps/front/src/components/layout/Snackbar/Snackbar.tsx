import { AiOutlineCheckCircle, AiOutlineClose } from "react-icons/ai";
import { PiWarningCircleBold } from "react-icons/pi";
import { MdOutlineDangerous } from "react-icons/md";
import { css } from "../../../../styled-system/css";
import { center, hstack, vstack } from "../../../../styled-system/patterns";
import { useSnackbarStore } from "./Snackbar.store";
import { useCallback } from "react";
import { useTransition } from "@react-spring/web";
import { animated } from "@react-spring/web";

const Snackbar = (): JSX.Element => {
  const { items, removeItem } = useSnackbarStore(({ items, removeItem }) => ({
    items,
    removeItem,
  }));

  const onClose = useCallback((id: string) => {
    removeItem(id);
  }, []);

  const transitions = useTransition(items, {
    from: {
      opacity: 0,
      transform: "translate3d(100%,0,0)",
    },
    enter: {
      opacity: 1,
      transform: "translate3d(0%,0,0)",
    },
    leave: {
      opacity: 0,
    },
    config: {
      duration: 250,
    },
  });

  const icons = {
    danger: <MdOutlineDangerous />,
    warning: <PiWarningCircleBold />,
    success: <AiOutlineCheckCircle />,
  };

  // : Record<State, IconType>

  return (
    <div
      className={css({
        position: "fixed",
        bottom: 0,
        right: 0,
        padding: "2rem",
      })}
    >
      {items && (
        <ul className={vstack({ gap: "1rem", alignItems: "end" })}>
          {transitions((style, { id, message, type }) => (
            <animated.li
              style={style}
              className={hstack({
                layerStyle: "container",
                padding: "1rem",
                alignItems: "center",
              })}
              key={id}
            >
              <div
                className={center({
                  backgroundColor: type,
                  width: "2rem",
                  height: "2rem",
                  border: "2px solid black",
                  rounded: ".5rem",
                })}
              >
                {icons[type]}
              </div>
              <p className={css({ textStyle: "body" })}>{message}</p>
              <button
                className={css({
                  padding: ".5rem",
                  cursor: "pointer",
                  rounded: "5px",
                  transition: "background",
                  _hover: {
                    backgroundColor: "gray",
                  },
                })}
                onClick={(): void => onClose(id)}
              >
                <AiOutlineClose />
              </button>
            </animated.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Snackbar;
