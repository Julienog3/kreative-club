import Button from "#root/src/components/utils/Button/Button";
import { css } from "#root/styled-system/css";
import { hstack, vstack } from "#root/styled-system/patterns";
import { PortfolioFolder } from "#root/types/portfolio";
import { PortfolioList } from "./PortfolioList";
import { RiDeleteBin5Fill } from "@react-icons/all-files/ri/RiDeleteBin5Fill";
import { FaPencilAlt } from "@react-icons/all-files/fa/FaPencilAlt";
import { useDeletePortfolioFolder } from "#root/src/api/portfolio/deletePortfolioFolder";
import { usePageContext } from "vike-react/usePageContext";

interface portfolioFolderDetailsProps {
  portfolioFolder: PortfolioFolder;
  onClose: () => void;
}

export const PortfolioFolderDetails = ({
  portfolioFolder,
  onClose,
}: portfolioFolderDetailsProps) => {
  const { user } = usePageContext();
  const deletePortfolioFolder = useDeletePortfolioFolder(user.id);

  const onDeletePorfolioFolder = () => {
    deletePortfolioFolder.mutate(portfolioFolder.id);
    onClose();
  };

  return (
    <div
      className={vstack({
        height: "100%",
        alignItems: "start",
        w: "100%",
      })}
    >
      <div
        className={hstack({
          justifyContent: "space-between",
          alignItems: "start",
          w: "100%",
          mb: "1rem",
        })}
      >
        <div>
          <Button onClick={onClose}>Retour au portfolio</Button>
          <h2 className={css({ textStyle: "subtitle" })}>
            Projet &quot;{portfolioFolder.title}&quot;
          </h2>
        </div>
        <div className={hstack()}>
          <Button onClick={() => {}}>
            <FaPencilAlt />
            Modifier
          </Button>
          <Button onClick={onDeletePorfolioFolder} variant="danger">
            <RiDeleteBin5Fill />
            Supprimer
          </Button>
        </div>
      </div>
      <p className={css({ textStyle: "body", mb: "1rem" })}>
        {portfolioFolder.description}
      </p>
      {portfolioFolder.portfolioImages && (
        <PortfolioList
          mode="edition"
          elements={portfolioFolder.portfolioImages}
          portfolioFolderId={portfolioFolder.id}
        />
      )}
    </div>
  );
};
