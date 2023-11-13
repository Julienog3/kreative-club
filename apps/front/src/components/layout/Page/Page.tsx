import { PropsWithChildren } from "react";
import { center } from "../../../../styled-system/patterns";

const Page = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <main
      className={center({
        height: "90vh",
        width: "full",
        backgroundColor: "background",
      })}
    >
      {children}
    </main>
  );
};

export default Page;
