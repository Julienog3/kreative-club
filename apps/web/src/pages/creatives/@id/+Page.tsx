import { usePageContext } from "vike-react/usePageContext";
import { css } from "../../../../styled-system/css";
import { hstack, vstack } from "#root/styled-system/patterns";
import { useCreativeQuery } from "#root/src/api/user/getCreative";
import { useEffect } from "react";
import Card from "#root/src/components/utils/Card/Card";
import Chip from "#root/src/components/utils/Chip/Chip";

export { Page };

function Page(): JSX.Element {
  const pageContext = usePageContext();
  const { data: creative } = useCreativeQuery(pageContext!.routeParams!.id);

  useEffect(() => {
    console.log({ creative });
  }, []);

  return (
    <div
      className={vstack({
        alignItems: "start",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "breakpoint-xl",
        margin: "0 auto",
        p: "1rem",
      })}
    >
      <Card css={{ p: "1rem" }}>
        <div className={hstack({ gap: "1.5rem" })}>
          <img
            className={css({
              border: "solid 2px #000",
              borderRadius: "12px",
              width: "6rem",
              height: "6rem",
            })}
            src={import.meta.env.VITE_API_URL.slice(0, -1) + creative.avatar}
            alt=""
          />
          <div className={vstack({ alignItems: "left", gap: 0 })}>
            <h2 className={css({ textStyle: "title" })}>
              {creative.firstName} {creative.lastName}
            </h2>
            <span>@{creative.username}</span>
          </div>
        </div>
        <div>
          <h3 className={css({ textStyle: "subtitle" })}>A propos</h3>
          <p>
            Nullam convallis lorem et leo elementum tempor. Curabitur a est
            risus. Proin eleifend elit luctus lorem porta, sit amet vulputate
            diam varius. Donec ultrices viverra urna, rhoncus consequat purus
            tristique in.
          </p>
          {creative.categories && (
            <>
              <h3 className={css({ textStyle: "subtitle" })}>Compétences</h3>
              <ul className={hstack()}>
                {creative.categories.map((category) => {
                  return (
                    <li key={category.id}>
                      <Chip>{category.title}</Chip>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
