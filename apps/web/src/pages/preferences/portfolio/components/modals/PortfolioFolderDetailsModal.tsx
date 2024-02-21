import Modal, {
  modalTransitionConfig,
} from "#root/src/components/utils/Modal/Modal";
import { useTransition } from "@react-spring/web";
import { PortfolioFolderDetails } from "../PortfolioFolderDetails";
import { PortfolioFolder } from "#root/types/portfolio";

interface PortfolioFolderDetailsModalProps {
  isShowed: boolean;
  closeModal: () => void;
  portfolioFolder?: PortfolioFolder;
}

export const PortfolioFolderDetailsModal = ({
  isShowed,
  closeModal,
  portfolioFolder,
}: PortfolioFolderDetailsModalProps) => {
  const modalTransition = useTransition(isShowed, modalTransitionConfig);
  return (
    <>
      {modalTransition((style, isOpened) => (
        <>
          {isOpened && (
            <Modal
              title={portfolioFolder!.title}
              style={{ ...style }}
              onClose={() => closeModal()}
            >
              {portfolioFolder && (
                <PortfolioFolderDetails portfolioFolder={portfolioFolder} />
              )}
            </Modal>
          )}
        </>
      ))}
    </>
  );
};
