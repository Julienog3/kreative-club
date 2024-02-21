import { css } from "#root/styled-system/css";
import { grid, gridItem, vstack } from "#root/styled-system/patterns";
import { PortfolioFolder } from "#root/types/portfolio";
import { CreatePortfolioForm } from "./CreatePortfolioForm";
import { PortfolioImageCard } from "./PortfolioImageCard";

interface portfolioFolderDetailsProps
  extends React.BaseHTMLAttributes<HTMLDivElement> {
  portfolioFolder?: PortfolioFolder;
}

export const PortfolioFolderDetails = (
  portfolioFolderDetailsProps: portfolioFolderDetailsProps,
) => {
  const { portfolioFolder } = portfolioFolderDetailsProps;

  return (
    <div
      className={vstack({
        height: "100%",
      })}
    >
      <p className={css({ textStyle: "body" })}>
        {portfolioFolder?.description}
      </p>
      <CreatePortfolioForm portfolioFolderId={portfolioFolder?.id} />
      {portfolioFolder?.portfolioImages && (
        <ul
          className={grid({
            columns: 3,
            gap: "1rem",
            h: "100%",
          })}
        >
          {portfolioFolder?.portfolioImages.map((portfolioImage) => (
            <>
              <li
                className={(gridItem(), vstack({ textStyle: "body" }))}
                key={portfolioImage.id}
              >
                <PortfolioImageCard portfolioImage={portfolioImage} />
                <p>{portfolioImage.title}</p>
              </li>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};
