import Card from "#root/src/components/utils/Card/Card";
import { css } from "#root/styled-system/css";
import { PortfolioFolder, PortfolioImage } from "#root/types/portfolio";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { PortfolioFolderCard } from "./PortfolioFolderCard";
import { PortfolioImageCard } from "./PortfolioImageCard";
import { gridItem, vstack } from "#root/styled-system/patterns";
import { useStoreModal } from "#root/src/components/utils/Modal/Modal.store";
import { CreatePortfolioItemModal } from "./modals/CreatePortfolioItemModal";
import { PortfolioFolderDetailsModal } from "./modals/PortfolioFolderDetailsModal";
import { useState } from "react";

interface PortfolioListProps {
  mode?: "preview" | "edition";
  elements: (PortfolioFolder | PortfolioImage)[];
  onPortfolioFolderSelect?: (id: string) => void;
  portfolioFolderId?: string;
}

export const PortfolioList = ({
  mode = "preview",
  elements,
  onPortfolioFolderSelect,
  portfolioFolderId,
}: PortfolioListProps) => {
  const { isShowed, closeModal, openModal } = useStoreModal((state) => state);
  const [portfolioFolderSelected, setPortfolioFolderSelected] =
    useState<PortfolioFolder>();
  const [isPortfolioFolderModalShowed, setIsPortfolioFolderModalShowed] =
    useState(false);

  const onPortfolioFolderClick = (portfolioFolder: PortfolioFolder) => {
    if (mode === "edition" && onPortfolioFolderSelect) {
      onPortfolioFolderSelect(portfolioFolder.id);
    }

    if (mode === "preview") {
      setPortfolioFolderSelected(portfolioFolder);
      setIsPortfolioFolderModalShowed(true);
    }
  };

  const renderPortfolioElement = (
    element: PortfolioFolder | PortfolioImage,
  ) => {
    if ((element as PortfolioFolder).description) {
      return (
        <PortfolioFolderCard
          portfolioFolder={element}
          onClick={() => onPortfolioFolderClick(element as PortfolioFolder)}
        />
      );
    }

    return (
      <>
        <PortfolioImageCard
          isEditionMode={mode === "edition"}
          portfolioImage={element as PortfolioImage}
        />
        <p>{element.title}</p>
      </>
    );
  };

  return (
    <>
      <CreatePortfolioItemModal
        isShowed={isShowed}
        portfolioFolderId={portfolioFolderId}
        closeModal={closeModal}
      />
      <PortfolioFolderDetailsModal
        isShowed={isPortfolioFolderModalShowed}
        portfolioFolder={portfolioFolderSelected}
        closeModal={() => setIsPortfolioFolderModalShowed(false)}
      />
      <ul
        className={css({
          display: "grid",
          gridTemplateColumns: 1,
          md: { gridTemplateColumns: 2 },
          lg: { gridTemplateColumns: 3 },
          gap: "1rem",
        })}
      >
        {mode === "edition" && (
          <li>
            <Card
              css={{
                h: "18rem",
                pos: "relative",
                cursor: "pointer",
                w: "100%",
                p: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                zIndex: 3,
                // borderStyle: "dashed",
              }}
              onClick={openModal}
            >
              <Card
                css={{
                  h: "12rem",
                  w: "100%",
                  backgroundColor: "gray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderStyle: "dashed",
                  fontSize: "1.5rem",
                }}
              >
                <FaPlus />
              </Card>
              <h3 className={css({ textStyle: "body" })}>Ajouter un élément</h3>
            </Card>
          </li>
        )}
        {elements &&
          elements.map((element) => {
            return (
              <li
                className={(gridItem(), vstack({ textStyle: "body" }))}
                key={element.id}
              >
                {renderPortfolioElement(element)}
              </li>
            );
          })}
      </ul>
    </>
  );
};
