import { Link, useNavigate } from "react-router-dom";
import { css } from "../../../../styled-system/css";
import { circle, hstack, vstack } from "../../../../styled-system/patterns";
import Button from "../../utils/Button/Button";
import { useAuth } from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useStoreAuthModal } from "../../modals/AuthModal/AuthModal.store";
import { AuthModalType } from "../../modals/AuthModal/AuthModal";
import { useQuery } from "@tanstack/react-query";
import { getProfileById } from "../../../api/profile";
import { useEffect } from "react";
import { useSnackbarStore } from "../Snackbar/Snackbar.store";
import Dropdown from "../../utils/Dropdown/Dropdown";
import { BsFillGearFill } from "react-icons/bs";
import { BiExit, BiSolidBuoy } from "react-icons/bi";

const Header = (): JSX.Element => {
  const openModal = useStoreAuthModal(({ openModal }) => openModal);
  const addItem = useSnackbarStore(({ addItem }) => addItem);

  const navigate = useNavigate();

  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      if (user) return getProfileById(user?.id);
    },
    enabled: !!user,
  });

  const handleLogout = (): void => {
    navigate("/");
    addItem({ type: "success", message: "vous etes bien déconnecté" });
  };

  const dropdownItems = [
    {
      label: "Paramètres",
      icon: <BsFillGearFill />,
      link: "/profile",
    },
    {
      label: "Support",
      icon: <BiSolidBuoy />,
      link: "/profile",
    },
    {
      label: "Se déconnecter",
      icon: <BiExit />,
      onClick: () => logout.mutate(),
    },
  ];

  useEffect(() => {
    if (logout.isSuccess) {
      handleLogout();
    }
  }, [logout.isSuccess]);

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
            <Dropdown items={dropdownItems}>
              <div
                className={hstack({
                  border: "2px solid black",
                  rounded: "10px",
                  padding: ".5rem",
                  backgroundColor: "gray",
                })}
              >
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
              </div>
            </Dropdown>
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
