import React from "react";
import { grid, gridItem, vstack } from "../../../../styled-system/patterns";
import { Link } from "../../../renderer/Link";
import List from "../../utils/List/List";
import { css } from "../../../../styled-system/css";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps): JSX.Element {
  return (
    <div
      className={vstack({
        minHeight: "100vh",
        width: "100%",
        maxWidth: "breakpoint-xl",
        margin: "0 auto",
      })}
    >
      <div className={grid({ columns: 4, gap: "1rem", w: "100%", p: "1rem" })}>
        <List>
          <List.Header bgColor="purple">Administration</List.Header>
          <List.Item>
            <Link
              className={css({
                p: "1rem",
                w: "100%",
                h: "100%",
                display: "block",
              })}
              href="/admin/general"
            >
              Général
            </Link>
          </List.Item>
          <List.Item>
            <Link
              className={css({
                p: "1rem",
                w: "100%",
                h: "100%",
                display: "block",
              })}
              href="/admin/users"
            >
              Utilisateurs
            </Link>
          </List.Item>
          <List.Item isLast>
            <Link
              className={css({
                p: "1rem",
                w: "100%",
                h: "100%",
                display: "block",
              })}
              href="/admin/categories"
            >
              Catégories
            </Link>
          </List.Item>
        </List>
        <div className={gridItem({ colSpan: 3 })}>{children}</div>
      </div>
    </div>
  );
}
