import { useBookmarksQuery } from "#root/src/api/bookmarks/getBookmarks";
import { css } from "#root/styled-system/css";
import { grid, vstack } from "#root/styled-system/patterns";
import { usePageContext } from "vike-react/usePageContext";
import CreativeCard from "../creatives/index/components/CreativeCard";
import Button from "#root/src/components/utils/Button/Button";
import { useRemoveBoomarkQuery } from "#root/src/api/bookmarks/removeBookmark";

export { Page };

function Page() {
  // const { userToken } = usePageContext();
  const { data: creatives } = useBookmarksQuery();
  const removeBookmark = useRemoveBoomarkQuery(userToken);

  return (
    <div
      className={vstack({
        minHeight: "100vh",
        width: "100%",
        maxWidth: "breakpoint-xl",
        margin: "0 auto",
        alignItems: "start",
        pt: "2rem",
      })}
    >
      <h2 className={css({ textStyle: "title", mb: "1rem" })}>Mes signets</h2>
      <ul className={grid({ columns: 3, h: "100%", gap: "1.5rem" })}>
        {creatives &&
          creatives.map((creative) => (
            <li key={creative.id}>
              <Button onClick={() => removeBookmark.mutate(creative.id)}>
                Retirer
              </Button>
              <CreativeCard {...creative} />
            </li>
          ))}
      </ul>
    </div>
  );
}
