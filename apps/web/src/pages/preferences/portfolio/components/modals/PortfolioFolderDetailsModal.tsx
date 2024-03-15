import Modal, {
  modalTransitionConfig,
} from "#root/src/components/utils/Modal/Modal";
import { useTransition } from "@react-spring/web";
import { PortfolioFolder } from "#root/types/portfolio";
import { PortfolioList } from "../PortfolioList";
import { css } from "#root/styled-system/css";
import { vstack } from "#root/styled-system/patterns";

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
              <div className={vstack({ alignItems: "start" })}>
                <p className={css({ textStyle: "body", mb: "1.5rem" })}>
                  {portfolioFolder?.description}
                </p>
                {portfolioFolder && portfolioFolder.portfolioImages && (
                  <PortfolioList
                    mode="preview"
                    elements={portfolioFolder.portfolioImages}
                    portfolioFolderId={portfolioFolder.id}
                  />
                )}
              </div>
            </Modal>
          )}
        </>
      ))}
    </>
  );
};
