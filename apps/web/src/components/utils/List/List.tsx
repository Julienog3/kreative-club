import { PropsWithChildren } from "react";
import Card from "../Card/Card";
import { hstack, vstack } from "../../../../styled-system/patterns";

interface ListProps {}

interface ListItemProps {
  isLast?: boolean;
}

const List = ({ children }: ListProps & PropsWithChildren): JSX.Element => {
  return <Card css={{ h: "fit-content" }}>{children}</Card>;
};

const Header = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={hstack({
        p: ".75rem",
        borderBottom: "solid 2px black",
        textStyle: "body",
        bgColor: "yellow",
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
