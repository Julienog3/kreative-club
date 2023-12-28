import { center, hstack } from "../../../../styled-system/patterns";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { useState } from "react";
import { animated, useTransition } from "@react-spring/web";
import { css } from "../../../../styled-system/css";
import { IoWarning } from "@react-icons/all-files/io5/IoWarning";

const Banner = (): JSX.Element => {
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const transitions = useTransition(isClosed, {
    from: { y: "0" },
    enter: { y: "0" },
    leave: { y: "-100%" },
  });
  return transitions((style, isClosed) => (
    <div
      className={css({
        overflow: "hidden",
        position: "sticky",
        left: "0",
        top: "0",
      })}
    >
      {!isClosed && (
        <animated.div
          style={style}
          className={hstack({
            w: "100%",
            bgColor: "warning",
            textStyle: "body",
            padding: "1rem",
            borderBottom: "2px solid black",
            justifyContent: "space-between",
          })}
        >
          <div className={hstack()}>
            <div
              className={center({
                backgroundColor: "white",
                width: "2rem",
                height: "2rem",
                border: "2px solid black",
                rounded: ".5rem",
              })}
            >
              <IoWarning />
            </div>
            Site en cours de développement
          </div>
          <button
            className={css({ cursor: "pointer" })}
            onClick={() => setIsClosed(true)}
          >
            <AiOutlineClose />
          </button>
        </animated.div>
      )}
    </div>
  ));
};

export default Banner;
