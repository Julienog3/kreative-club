import Card from "../../../components/utils/Card/Card";
import { PreferencesLayout } from "../../../components/layout/PreferencesLayout/PreferencesLayout";
import { css } from "../../../../styled-system/css";
import { gridItem, vstack } from "../../../../styled-system/patterns";
import { usePageContext } from "vike-react/usePageContext";
import Modal, {
  modalTransitionConfig,
} from "#root/src/components/utils/Modal/Modal";
import { useTransition } from "@react-spring/web";
import { PortfolioImageCard } from "./components/PortfolioImageCard";
import { useStoreModal } from "#root/src/components/utils/Modal/Modal.store";
import { useState } from "react";
import { PortfolioFolderDetails } from "./components/PortfolioFolderDetails";
import { PortfolioFolder } from "#root/types/portfolio";
import { CreatePortfolioItemModal } from "./components/modals/CreatePortfolioItemModal";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { usePortfolioImages } from "#root/src/api/portfolio/getPortfolioImages";
import { usePortfolioFolders } from "#root/src/api/portfolio/getPortflioFolders";
import { PortfolioFolderCard } from "./components/PortfolioFolderCard";

export { Page };

function Page(): JSX.Element {
  const { user } = usePageContext();

  const { data: portfolioImages } = usePortfolioImages(user.id);
  const { data: portfolioFolders } = usePortfolioFolders(user.id);

  const { isShowed, closeModal, openModal } = useStoreModal((state) => state);

  const [portfolioFolderDetailsModal, setPortfolioFolderDetailsModal] =
    useState<{
      isShowed: boolean;
      portfolioFolder?: PortfolioFolder;
    }>({
      isShowed: false,
      portfolioFolder: undefined,
    });
  const portfolioFolderDetailsTransition = useTransition(
    portfolioFolderDetailsModal.isShowed,
    modalTransitionConfig,
  );

  return (
    <>
      <CreatePortfolioItemModal isShowed={isShowed} closeModal={closeModal} />
      {portfolioFolderDetailsTransition((style, isOpened) => (
        <>
          {isOpened && (
            <Modal
              title={portfolioFolderDetailsModal.portfolioFolder?.title ?? ""}
              style={{ ...style }}
              onClose={() =>
                setPortfolioFolderDetailsModal({
                  isShowed: false,
                })
              }
            >
              <PortfolioFolderDetails
                portfolioFolder={portfolioFolderDetailsModal.portfolioFolder}
              />
            </Modal>
          )}
        </>
      ))}
      <PreferencesLayout>
        <Card css={{ width: "100%", height: "100%", p: "1.5rem 1rem" }}>
          <div
            className={vstack({
              w: "100%",
              alignItems: "flex-start",
              p: "1rem",
              height: "100%",
            })}
          >
            <h1 className={css({ textStyle: "title" })}>Portfolio</h1>
            <p className={css({ textStyle: "body", mb: "1rem" })}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              at quam nulla. Nam id leo mauris.
            </p>
            <ul
              className={css({
                display: "grid",
                gridTemplateColumns: 1,
                md: { gridTemplateColumns: 2 },
                lg: { gridTemplateColumns: 3 },
                gap: "1rem",
              })}
            >
              <li onClick={() => openModal()}>
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
                  <h3 className={css({ textStyle: "body" })}>
                    Ajouter un élément
                  </h3>
                </Card>
              </li>
              {portfolioImages &&
                portfolioImages.map((portfolioImage) => (
                  <li
                    className={(gridItem(), vstack({ textStyle: "body" }))}
                    key={portfolioImage.id}
                  >
                    <PortfolioImageCard portfolioImage={portfolioImage} />
                    <p>{portfolioImage.title}</p>
                  </li>
                ))}
              {portfolioFolders &&
                portfolioFolders.map((portfolioFolder) => (
                  <li
                    className={(gridItem(), vstack({ textStyle: "body" }))}
                    key={portfolioFolder.id}
                  >
                    <PortfolioFolderCard
                      portfolioFolder={portfolioFolder}
                      onClick={() =>
                        setPortfolioFolderDetailsModal({
                          isShowed: true,
                          portfolioFolder,
                        })
                      }
                    />
                  </li>
                ))}
            </ul>
          </div>
        </Card>
      </PreferencesLayout>
    </>
  );
}
