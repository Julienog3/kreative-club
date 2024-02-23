import React, { PropsWithChildren } from "react";
import Card from "../Card/Card";
import { hstack, vstack } from "../../../../styled-system/patterns";

interface ListHeaderProps {
  children: React.ReactNode;
  bgColor?: string;
}

interface ListProps {}

interface ListItemProps {
  isLast?: boolean;
}

const List = ({ children }: ListProps & PropsWithChildren): JSX.Element => {
  return (
    <Card css={{ h: "fit-content", position: "sticky", top: "1rem" }}>
      {children}
    </Card>
  );
};

const Header = ({ children, bgColor = "yellow" }: ListHeaderProps) => {
  return (
    <div
      className={hstack({
        p: ".75rem",
        borderBottom: "solid 2px black",
        textStyle: "body",
        bgColor,
        height: "fit-content",
      })}
    >
      {children}
    </div>
  );
};

List.Header = Header;

const Body = ({ children }: PropsWithChildren) => {
  return <ul className={vstack()}>{children}</ul>;
};

List.Body = Body;

const Item = ({
  children,
  isLast = false,
}: ListItemProps & PropsWithChildren): JSX.Element => {
  return (
    <li
      className={vstack({
        alignItems: "start",
        textStyle: "body",
        borderBottom: !isLast ? "solid 2px black" : undefined,
        transition: "all",
        _hover: {
          bgColor: "gray",
        },
      })}
    >
      {children}
    </li>
  );
};

List.Item = Item;

export default List;
