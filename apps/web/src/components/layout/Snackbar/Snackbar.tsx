import { css } from "../../../../styled-system/css";
import { vstack } from "../../../../styled-system/patterns";
import { useSnackbarStore } from "./Snackbar.store";
import { useTransition } from "@react-spring/web";
import SnackbarItem from "./SnackbarItem";

const Snackbar = (): JSX.Element => {
  const items = useSnackbarStore(({ items }) => items);

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

  // : Record<State, IconType>

  return (
    <div
      className={css({
        position: "fixed",
        bottom: 0,
        right: 0,
        padding: "2rem",
        zIndex: 50,
      })}
    >
      {items && (
        <ul className={vstack({ gap: "1rem", alignItems: "end" })}>
          {transitions((style, item) => (
            <SnackbarItem style={style} {...item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Snackbar;
