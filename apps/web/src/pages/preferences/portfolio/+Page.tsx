import Card from "../../../components/utils/Card/Card";
import { PreferencesLayout } from "../../../components/layout/PreferencesLayout/PreferencesLayout";
import { css } from "../../../../styled-system/css";
import {
  grid,
  gridItem,
  hstack,
  vstack,
} from "../../../../styled-system/patterns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserPortfolioImages } from "#root/src/api/user";
import { usePageContext } from "#root/src/renderer/usePageContext";
import Modal, {
  modalTransitionConfig,
} from "#root/src/components/utils/Modal/Modal";
import { useTransition } from "@react-spring/web";
import Button from "#root/src/components/utils/Button/Button";
import { CreatePortfolioForm } from "./CreatePortfolioForm";
import { PortfolioImageCard } from "./PortfolioImageCard";
import { useStoreModal } from "#root/src/components/utils/Modal/Modal.store";
import { deletePortfolioImage } from "#root/src/api/portfolioImage";
import { useSnackbarStore } from "#root/src/components/layout/Snackbar/Snackbar.store";
import { useState } from "react";

export { Page };

function Page(): JSX.Element {
  const { user } = usePageContext();
  const { addItem } = useSnackbarStore((state) => state);

  const { data: portfolioImages, isLoading } = useQuery({
    queryKey: ["portfolio", user.id],
    queryFn: () => getUserPortfolioImages(user.id),
  });

  const queryClient = useQueryClient();

  const removePortfolioImage = useMutation({
    mutationFn: deletePortfolioImage,
    onSuccess: () => {
      addItem({
        type: "success",
        message: "L'image a bien été supprimé !",
      });
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });

  const onDeletePortfolioImage = async (portfolioImageId: string) => {
    removePortfolioImage.mutate(portfolioImageId);
    setConfirmationModal((confirmationModal) => ({
      ...confirmationModal,
      isShowed: false,
    }));
  };

  const { isShowed, closeModal, openModal } = useStoreModal((state) => state);
  const modalTransition = useTransition(isShowed, modalTransitionConfig);

  const [confirmationModal, setConfirmationModal] = useState<{
    isShowed: boolean;
    portfolioImageId: string | null;
  }>({
    isShowed: false,
    portfolioImageId: null,
  });
  const confirmationModalTransition = useTransition(
    confirmationModal.isShowed,
    modalTransitionConfig,
  );

  return (
    <>
      {modalTransition((style, isOpened) => (
        <>
          {isOpened && (
            <Modal
              title="Ajouter une image"
              style={{ ...style }}
              onClose={() => {
                closeModal();
              }}
            >
              <CreatePortfolioForm />
            </Modal>
          )}
        </>
      ))}
      {confirmationModalTransition((style, isOpened) => (
        <>
          {isOpened && (
            <Modal
              title="Supprimer une image"
              style={{ ...style }}
              onClose={() => {
                setConfirmationModal({
                  isShowed: false,
                  portfolioImageId: null,
                });
              }}
            >
              <p>Etes-vous sûr de vouloir supprimer cette image ?</p>
              <div className={hstack()}>
                <Button
                  onClick={() => {
                    if (!confirmationModal.portfolioImageId) return;
                    onDeletePortfolioImage(confirmationModal.portfolioImageId);
                  }}
                >
                  Supprimer
                </Button>
                <Button disabled>Annuler</Button>
              </div>
            </Modal>
          )}
        </>
      ))}
      <PreferencesLayout>
        <Card css={{ width: "100%", height: "100%" }}>
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

            {isLoading && <p>Image portfolio loading</p>}

            {portfolioImages && (
              <ul className={grid({ columns: 3, gap: "1rem" })}>
                {portfolioImages.map((portfolioImage) => (
                  <li
                    className={(gridItem(), vstack({ textStyle: "body" }))}
                    key={portfolioImage.id}
                  >
                    <PortfolioImageCard
                      portfolioImage={portfolioImage}
                      onDelete={() =>
                        setConfirmationModal({
                          isShowed: true,
                          portfolioImageId: portfolioImage.id,
                        })
                      }
                    />
                    <p>{portfolioImage.title}</p>
                  </li>
                ))}
              </ul>
            )}
            <Button onClick={() => openModal()}>Ajouter un projet</Button>
          </div>
        </Card>
      </PreferencesLayout>
    </>
  );
}
