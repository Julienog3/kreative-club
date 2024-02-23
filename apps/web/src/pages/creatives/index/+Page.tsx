import { useCreativesQuery } from "#root/src/api/user/getCreatives";
import { css } from "../../../../styled-system/css";
import { grid, hstack, vstack } from "../../../../styled-system/patterns";
import Chip from "../../../components/utils/Chip/Chip";
import CreativeCard from "./components/CreativeCard";
import { BiHomeAlt } from "@react-icons/all-files/bi/BiHomeAlt";

export { Page };

function Page(): JSX.Element {
  const { data: creatives } = useCreativesQuery();

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
      <div className={hstack({ mb: "2.5rem" })}>
        <Chip>
          <BiHomeAlt /> Accueil
        </Chip>
        <Chip>Tous les créatifs</Chip>
      </div>
      <h2 className={css({ textStyle: "title", mb: "1.5rem" })}>
        Tous les créatifs
      </h2>
      <ul className={grid({ columns: 3, h: "100%", gap: "1.5rem" })}>
        {creatives &&
          creatives.map((creative) => (
            <li key={creative.id}>
              <CreativeCard {...creative} />
            </li>
          ))}
      </ul>
    </div>
  );
}
