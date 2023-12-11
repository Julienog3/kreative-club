"use client";

import { css } from "../../../../styled-system/css";
import { hstack, vstack } from "../../../../styled-system/patterns";
import Button from "../../utils/Button/Button";
import { useAuth } from "../../../hooks/useAuth";
import { useTranslation } from "next-i18next";
import { useStoreAuthModal } from "../../modals/AuthModal/AuthModal.store";
import { AuthModalType } from "../../modals/AuthModal/AuthModal";
import { useEffect } from "react";
import { useSnackbarStore } from "../Snackbar/Snackbar.store";
import Dropdown from "../../utils/Dropdown/Dropdown";
import { BsFillGearFill } from "react-icons/bs";
import { BiExit, BiSolidBuoy } from "react-icons/bi";
import HeaderProfile from "./HeaderProfile";
import Link from "next/link";

const Header = (): JSX.Element => {
  const openModal = useStoreAuthModal(({ openModal }) => openModal);
  const addItem = useSnackbarStore(({ addItem }) => addItem);

  // const navigate = useNavigate();

  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const handleLogout = (): void => {
    // navigate("/");
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
      <Link href="/">
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
              <HeaderProfile user={user} />
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
