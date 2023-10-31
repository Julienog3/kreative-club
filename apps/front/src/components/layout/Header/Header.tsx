import { css } from "../../../../styled-system/css";
import { vstack } from "../../../../styled-system/patterns";
import Button from "../../utils/Button/Button";

const Header = (): JSX.Element => {
  return (
    <header
      className={vstack({
        height: 20,
        px: 6,
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "#fff",
        borderBottom: "solid #000 2px",
      })}
    >
      <img
        className={css({ width: 24 })}
        src="/images/kreative-club.svg"
        alt="Logo Kreative club"
      />
      <Button>Go on app</Button>
    </header>
  );
};

export default Header;
