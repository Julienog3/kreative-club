import { PropsWithChildren } from "react";
import { css } from "../../../../styled-system/css";

const Page = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <main
      className={css({
        minHeight: "100vh",
        // width: "full",
      })}
    >
      {children}
    </main>
  );
};

export default Page;
