import { PropsWithChildren } from "react";
import { center } from "../../../../styled-system/patterns";

const Page = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <main
      className={center({
        height: "100vh",
        width: "full",
        backgroundColor: "#F9F5F2",
      })}
    >
      {children}
    </main>
  );
};

export default Page;
