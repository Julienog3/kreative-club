import { css } from "../../../../styled-system/css";
import { vstack } from "../../../../styled-system/patterns";
import { User } from "../../../api/user";

interface HomePageProps {
  user: User;
}

const HomePage = ({ user }: HomePageProps) => {
  return (
    <>
      <div
        className={vstack({
          p: "2rem",
          width: "100%",
          height: "100%",
          maxWidth: "1440px",
          marginX: "auto",
          gap: "2rem",
          alignItems: "start",
        })}
      >
        <article
          className={vstack({
            border: "2px solid #000",
            textStyle: "body",
            padding: "1rem",
            rounded: ".5rem",
            height: "15rem",
            width: "50%",
            minWidth: "40rem",
            backgroundColor: "blue",
            color: "black",
            alignItems: "start",
            justifyContent: "end",
            position: "relative",
            overflow: "hidden",
          })}
        >
          <span
            className={css({
              p: ".5rem 1rem",
              backgroundColor: "yellow",
              border: "2px solid #000",
              borderRadius: "999px",
            })}
          >
            Bon retour parmi nous
          </span>
          <h2 className={css({ textStyle: "title" })}>
            Bonjour {user?.username}
          </h2>
          <img
            className={css({
              height: "30rem",
              position: "absolute",
              right: "1rem",
              top: "0rem",
            })}
            src="/images/character.png"
            alt="cool"
          />
          {/* <p className={css({ textStyle: "body" })}>Ravi de vous revoir</p> */}
        </article>
      </div>
    </>
  );
};

export default HomePage;
