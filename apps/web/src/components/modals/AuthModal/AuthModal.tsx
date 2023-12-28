import Button from "../../utils/Button/Button";
import Modal, { ModalStyle } from "../../utils/Modal/Modal";
import { useStoreAuthModal } from "./AuthModal.store";
import LoginForm from "./forms/LoginForm";
import SignUpForm from "./forms/SignUpForm";

export enum AuthModalType {
  LOGIN = 0,
  SIGNUP = 1,
}

interface AuthModalProps {
  style: ModalStyle;
}

const AuthModal = ({ style }: AuthModalProps) => {
  const { type, closeModal, changeModalType } = useStoreAuthModal(
    ({ type, closeModal, changeModalType }) => ({
      type,
      closeModal,
      changeModalType,
    }),
  );

  if (type === AuthModalType.LOGIN) {
    return (
      <Modal onClose={closeModal} style={{ ...style }} title="Connexion">
        <LoginForm />
        <Button onClick={(): void => changeModalType(AuthModalType.SIGNUP)}>
          Sign up
        </Button>
      </Modal>
    );
  }

  if (type === AuthModalType.SIGNUP) {
    return (
      <Modal onClose={closeModal} style={{ ...style }} title="Inscription">
        <SignUpForm />
        <Button onClick={(): void => changeModalType(AuthModalType.LOGIN)}>
          Login
        </Button>
      </Modal>
    );
  }

  return;
};

export default AuthModal;
