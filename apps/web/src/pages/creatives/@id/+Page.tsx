import { usePageContext } from "vike-react/usePageContext";
import { css } from "../../../../styled-system/css";
import { grid, gridItem, hstack, vstack } from "#root/styled-system/patterns";
import { useCreativeQuery } from "#root/src/api/user/getCreative";
import Card from "#root/src/components/utils/Card/Card";
import Chip from "#root/src/components/utils/Chip/Chip";
import Button from "#root/src/components/utils/Button/Button";
import { PortfolioImageCard } from "../../preferences/portfolio/components/PortfolioImageCard";
import { usePortfolioImages } from "#root/src/api/portfolio/getPortfolioImages";
import { useAddBoomarkQuery } from "#root/src/api/bookmarks/addBookmark";

export { Page };

function Page(): JSX.Element {
  const { userToken, routeParams } = usePageContext();
  const { data: creative } = useCreativeQuery(routeParams!.id);
  const { data: portfolioImages } = usePortfolioImages(creative.id);
  const addBookmark = useAddBoomarkQuery(userToken);

  return (
    <div
      className={vstack({
        alignItems: "start",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "breakpoint-xl",
        margin: "0 auto",
        p: "1rem",
      })}
    >
      <div className={grid({ columns: 6, gap: "1rem", w: "100%", p: "1rem" })}>
        <div className={gridItem({ colSpan: 4 })}>
          <Card css={{ p: "1rem" }}>
            <h3 className={css({ textStyle: "subtitle" })}>Portfolio</h3>
            <ul>
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
            </ul>
          </Card>
        </div>
        <div
          className={gridItem({
            colSpan: 2,
            position: "sticky",
            top: "1rem",
            left: "0rem",
          })}
        >
          <Card css={{ p: "1rem" }} withShadow>
            <div className={hstack({ gap: "1.5rem" })}>
              <img
                className={css({
                  border: "solid 2px #000",
                  borderRadius: "12px",
                  width: "4rem",
                  height: "4rem",
                })}
                src={
                  import.meta.env.VITE_API_URL.slice(0, -1) + creative.avatar
                }
                alt=""
              />
              <div className={vstack({ alignItems: "left", gap: 0 })}>
                <h2 className={css({ textStyle: "subtitle" })}>
                  {creative.firstName} {creative.lastName}
                </h2>
                <span className={css({ textStyle: "body", color: "purple" })}>
                  @{creative.username}
                </span>
              </div>
            </div>
            <div>
              <h3 className={css({ textStyle: "subtitle" })}>A propos</h3>
              <p>
                Nullam convallis lorem et leo elementum tempor. Curabitur a est
                risus. Proin eleifend elit luctus lorem porta, sit amet
                vulputate diam varius. Donec ultrices viverra urna, rhoncus
                consequat purus tristique in.
              </p>
              {creative.categories && (
                <>
                  <h3 className={css({ textStyle: "subtitle" })}>
                    Compétences
                  </h3>
                  <ul className={hstack()}>
                    {creative.categories.map((category) => {
                      return (
                        <li key={category.id}>
                          <Chip>{category.title}</Chip>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
            <div className={hstack({ mt: "1rem" })}>
              <Button onClick={() => addBookmark.mutate(creative.id)}>
                Bookmark
              </Button>
              <Button variant="success">Envoyer</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
