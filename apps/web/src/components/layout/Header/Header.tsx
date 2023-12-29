import { css } from "../../../../styled-system/css";
import { hstack, vstack } from "../../../../styled-system/patterns";
import Button from "../../utils/Button/Button";
import { useAuth } from "../../../hooks/useAuth";
import { useStoreAuthModal } from "../../modals/AuthModal/AuthModal.store";
import { AuthModalType } from "../../modals/AuthModal/AuthModal";
import { useEffect } from "react";
import { useSnackbarStore } from "../Snackbar/Snackbar.store";
import Dropdown from "../../utils/Dropdown/Dropdown";
import { BsFillGearFill } from "@react-icons/all-files/bs/BsFillGearFill";
import { IoHelpBuoySharp } from "@react-icons/all-files/io5/IoHelpBuoySharp";
import { BiExit } from "@react-icons/all-files/bi/BiExit";

import HeaderProfile from "./HeaderProfile";
import { Link } from "../../../renderer/Link";

const Header = (): JSX.Element => {
  const openModal = useStoreAuthModal(({ openModal }) => openModal);
  const addItem = useSnackbarStore(({ addItem }) => addItem);
  // const navigate = useNavigate();

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
      icon: <IoHelpBuoySharp />,
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
              Se connecter
            </Button>
            <Button onClick={(): void => openModal(AuthModalType.SIGNUP)}>
              S&apos;inscrire
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
