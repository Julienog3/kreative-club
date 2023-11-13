import { Link } from "react-router-dom";
import { css } from "../../../../styled-system/css";
import { circle, hstack, vstack } from "../../../../styled-system/patterns";
import Button from "../../utils/Button/Button";
import { useAuth } from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useStoreAuthModal } from "../../modals/AuthModal/AuthModal.store";
import { AuthModalType } from "../../modals/AuthModal/AuthModal";
import { useQuery } from "@tanstack/react-query";
import { getProfileById } from "../../../api/profile";
import ButtonWithLink from "../../utils/ButtonWithLink/ButtonWithLink";

const Header = (): JSX.Element => {
  const openModal = useStoreAuthModal(({ openModal }) => openModal);

  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      if (user) return getProfileById(user?.id);
    },
    enabled: !!user,
  });

  return (
    <header
      className={vstack({
        width: "100%",
        height: "10vh",
        paddingX: "1rem",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "#fff",
        borderBottom: "solid #000 2px",
      })}
    >
      <Link to="/">
        <img
          className={css({ width: "5rem" })}
          src="/images/kreative-club.svg"
          alt="Logo Kreative club"
        />
      </Link>
      <div className={hstack({ gap: 8 })}>
        {user ? (
          <>
            <img
              className={circle({
                w: "35px",
                h: "35px",
                objectFit: "cover",
                border: "solid 2px black",
              })}
              src={profile?.avatar.url}
              alt="avatar"
            />
            <p
              className={css({
                textStyle: "body",
                textTransform: "capitalize",
                mr: 4,
              })}
            >
              Bonjour{" "}
              <span
                className={css({
                  fontWeight: "bold",
                })}
              >
                {profile?.firstName} {profile?.lastName}
              </span>
            </p>
            <ButtonWithLink to="/profile">Voir profil</ButtonWithLink>
            <Button variant="danger" onClick={(): void => logout.mutate()}>
              Se déconnecter
            </Button>
          </>
        ) : (
          <>
            <Button onClick={(): void => openModal(AuthModalType.LOGIN)}>
              {t("app.actions.login")}
            </Button>
            <Button onClick={(): void => openModal(AuthModalType.SIGNUP)}>
              {t("app.actions.signup")}
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
