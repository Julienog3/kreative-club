import { Link } from "react-router-dom";
import { css } from "../../../../styled-system/css";
import { hstack, vstack } from "../../../../styled-system/patterns";
import Button from "../../utils/Button/Button";
import { useAuth } from "../../../hooks/useAuth";
import ButtonWithLink from "../../utils/ButtonWithLink/ButtonWithLink";
import { useTranslation } from "react-i18next";

const Header = (): JSX.Element => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <header
      className={vstack({
        position: "fixed",
        top: 0,
        width: "full",
        height: 20,
        px: 6,
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "#fff",
        borderBottom: "solid #000 2px",
      })}
    >
      <Link to="/">
        <img
          className={css({ width: 24 })}
          src="/images/kreative-club.svg"
          alt="Logo Kreative club"
        />
      </Link>
      <div className={hstack({ gap: 2 })}>
        {user ? (
          <>
            <p className={css({ textStyle: "body", mr: 4 })}>
              Bonjour {user.username}
            </p>
            <Button onClick={(): void => logout.mutate()}>
              Se déconnecter
            </Button>
          </>
        ) : (
          <>
            <ButtonWithLink to="/login">
              {t("app.actions.login")}
            </ButtonWithLink>
            <ButtonWithLink to="/signup">
              {t("app.actions.signup")}
            </ButtonWithLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
