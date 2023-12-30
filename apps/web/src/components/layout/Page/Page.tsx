import { PropsWithChildren } from "react";
import { vstack } from "../../../../styled-system/patterns";

const Page = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <main
      className={vstack({
        minHeight: "100vh",
        width: "full",
        p: "1rem",
      })}
    >
      {children}
    </main>
  );
};

export default Page;
