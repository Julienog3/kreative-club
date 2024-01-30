import { PropsWithChildren } from "react";
import { vstack } from "../../../../styled-system/patterns";

const Page = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <main
      className={vstack({
        minHeight: "100vh",
        width: "100%",
        maxWidth: "breakpoint-xl",
        margin: "0 auto",
      })}
    >
      {children}
    </main>
  );
};

export default Page;
