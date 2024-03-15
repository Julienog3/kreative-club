import Card from "../../../components/utils/Card/Card";
import { PreferencesLayout } from "../../../components/layout/PreferencesLayout/PreferencesLayout";
import { css } from "../../../../styled-system/css";
import { vstack } from "../../../../styled-system/patterns";
import { usePageContext } from "vike-react/usePageContext";
import { useMemo, useState } from "react";
import { PortfolioFolderDetails } from "./components/PortfolioFolderDetails";
import { usePortfolioImages } from "#root/src/api/portfolio/getPortfolioImages";
import { usePortfolioFolders } from "#root/src/api/portfolio/getPortflioFolders";
import { PortfolioList } from "./components/PortfolioList";

export { Page };

function Page(): JSX.Element {
  const { user } = usePageContext();

  const { data: portfolioImages } = usePortfolioImages(user.id);
  const { data: portfolioFolders } = usePortfolioFolders(user.id);

  const portfolioElements = useMemo(
    () =>
      portfolioImages && portfolioFolders
        ? [...portfolioImages, ...portfolioFolders].sort(
            (a, b) =>
              new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
          )
        : [],
    [portfolioImages, portfolioFolders],
  );

  const [selectedPortfolioFolderId, setSelectedPortfolioFolderId] =
    useState<string>();
  const portfolioFolderSelected = useMemo(
    () => portfolioFolders?.find(({ id }) => selectedPortfolioFolderId === id),
    [selectedPortfolioFolderId],
  );

  return (
    <>
      <PreferencesLayout>
        <Card css={{ width: "100%", height: "100%", p: "1rem" }}>
          <div
            className={vstack({
              w: "100%",
              alignItems: "flex-start",
              p: "1rem",
              height: "100%",
            })}
          >
            {selectedPortfolioFolderId ? (
              <>
                {portfolioFolderSelected && (
                  <PortfolioFolderDetails
                    portfolioFolder={portfolioFolderSelected}
                    onClose={() => setSelectedPortfolioFolderId(undefined)}
                  />
                )}
              </>
            ) : (
              <>
                <h1 className={css({ textStyle: "title" })}>Portfolio</h1>
                <p className={css({ textStyle: "body", mb: "1rem" })}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent at quam nulla. Nam id leo mauris.
                </p>
                <PortfolioList
                  mode="edition"
                  elements={portfolioElements}
                  onPortfolioFolderSelect={(id) =>
                    setSelectedPortfolioFolderId(id)
                  }
                />
              </>
            )}
          </div>
        </Card>
      </PreferencesLayout>
    </>
  );
}
