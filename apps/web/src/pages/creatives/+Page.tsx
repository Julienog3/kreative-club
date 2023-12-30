import { css } from "../../../styled-system/css";
import { grid, hstack } from "../../../styled-system/patterns";
import Chip from "../../components/utils/Chip/Chip";
import CreativeCard from "./CreativeCard/CreativeCard";
import { BiHomeAlt } from "@react-icons/all-files/bi/BiHomeAlt";

export { Page };

function Page(): JSX.Element {
  return (
    <div className={css({ p: "1rem", maxWidth: "1440px" })}>
      <div className={hstack({ mb: "2.5rem" })}>
        <Chip>
          <BiHomeAlt /> Accueil
        </Chip>
        <Chip>Tous les créatifs</Chip>
      </div>
      <h2 className={css({ textStyle: "title", mb: "1.5rem" })}>
        Tous les créatifs
      </h2>
      <div className={grid({ columns: 2, h: "100%", gap: "1.5rem" })}>
        <CreativeCard />
        <CreativeCard />
        <CreativeCard />
        <CreativeCard />
      </div>
    </div>
  );
}
