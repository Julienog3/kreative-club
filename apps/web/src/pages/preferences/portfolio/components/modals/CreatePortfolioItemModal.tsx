import Button from "#root/src/components/utils/Button/Button";
import Modal, {
  modalTransitionConfig,
} from "#root/src/components/utils/Modal/Modal";
import { useTransition } from "@react-spring/web";
import { useState } from "react";
import { CreatePortfolioFolderForm } from "../CreatePortfolioFolderForm";
import { hstack } from "#root/styled-system/patterns";
import { CreatePortfolioForm } from "../CreatePortfolioForm";

type PortfolioType = "folder" | "image";
interface CreatePortfolioItemModalProps {
  isShowed: boolean;
  closeModal: () => void;
  portfolioFolderId?: string;
}

export const CreatePortfolioItemModal = ({
  isShowed,
  closeModal,
  portfolioFolderId,
}: CreatePortfolioItemModalProps) => {
  const modalTransition = useTransition(isShowed, modalTransitionConfig);
  const [createPortfolioType, setCreatePortfolioType] =
    useState<PortfolioType>("image");

  const renderModalForm = () => {
    switch (createPortfolioType) {
      case "folder":
        return <CreatePortfolioFolderForm />;
      case "image":
        return <CreatePortfolioForm portfolioFolderId={portfolioFolderId} />;
      default:
        return null;
    }
  };

  const selectType = (type: PortfolioType) => {
    setCreatePortfolioType(type);
  };

  return (
    <>
      {modalTransition((style, isOpened) => (
        <>
          {isOpened && (
            <Modal
              title={
                createPortfolioType === "image"
                  ? "Ajouter une image"
                  : "Ajouter un dossier"
              }
              style={{ ...style }}
              onClose={() => {
                closeModal();
              }}
            >
              {!portfolioFolderId && (
                <div className={hstack()}>
                  <Button onClick={() => selectType("image")}>Image</Button>
                  <Button onClick={() => selectType("folder")}>Dossier</Button>
                </div>
              )}
              {renderModalForm()}
            </Modal>
          )}
        </>
      ))}
    </>
  );
};
