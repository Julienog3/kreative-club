import { css } from "#root/styled-system/css";
import { hstack, vstack } from "#root/styled-system/patterns";
import { Link } from "../../Link";
import { FiUsers } from "@react-icons/all-files/fi/FiUsers";
import { IoPricetagsOutline } from "@react-icons/all-files/io5/IoPricetagsOutline";
import { GoGear } from "@react-icons/all-files/go/GoGear";

export const Sidebar = () => {
  return (
    <aside
      className={vstack({
        bgColor: "white",
        minH: "screen",
        borderRight: "3px solid black",
        width: "15rem",
        pos: "fixed",
        textStyle: "body",
        alignItems: "start",
        p: "1rem",
      })}
    >
      <h2 className={css({ fontSize: "1.25rem" })}>Administration</h2>
      <h3>Menu</h3>
      <ul>
        <li>
          <Link
            className={css({
              p: "1rem",
              w: "100%",
              h: "100%",
              display: "block",
            })}
            href="/admin/general"
          >
            <div className={hstack()}>
              <GoGear /> Général
            </div>
          </Link>
        </li>
        <li>
          <Link
            className={css({
              p: "1rem",
              w: "100%",
              h: "100%",
              display: "block",
            })}
            href="/admin/users"
          >
            <div className={hstack()}>
              <FiUsers /> Utilisateurs
            </div>
          </Link>
        </li>
        <li>
          <Link
            className={css({
              p: "1rem",
              w: "100%",
              h: "100%",
              display: "block",
            })}
            href="/admin/categories"
          >
            <div className={hstack()}>
              <IoPricetagsOutline /> Catégories
            </div>
          </Link>
        </li>
      </ul>
    </aside>
  );
};
