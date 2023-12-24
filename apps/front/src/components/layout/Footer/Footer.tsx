import { css } from "../../../../styled-system/css";
import { hstack, vstack } from "../../../../styled-system/patterns";
import logo from "../../../../public/images/kreative-club.svg";

const Footer = (): JSX.Element => {
  return (
    <footer
      className={hstack({
        w: "100%",
        bgColor: "white",
        h: "25vh",
        borderTop: "2px solid black",
        p: "2rem",
        // justifyContent: "space-between",
      })}
    >
      <div
        className={vstack({
          h: "100%",
          alignItems: "start",
          justifyContent: "center",
          gap: "1rem",
        })}
      >
        <img
          className={css({ width: "7.5rem" })}
          src={logo.src}
          alt="Logo Kreative club"
        />
        <p className={css({ textStyle: "body", w: "75%", fontSize: ".9rem" })}>
          La plateforme de service de graphisme pour les freelances débutants
        </p>
      </div>
      <div
        className={vstack({
          h: "100%",
          alignItems: "end",
          justifyContent: "end",
          gap: 0,
          marginLeft: "auto",
        })}
      >
        <p className={css({ textStyle: "body", fontSize: ".9rem" })}>
          Copyright 2023 © Kreative club
        </p>
        <p className={css({ textStyle: "body", fontSize: ".9rem" })}>
          Made with ❤ by Julien A.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
