import { css } from "../../../../styled-system/css";
import { hstack, vstack } from "../../../../styled-system/patterns";
import Button from "../../../components/utils/Button/Button";
import Card from "../../../components/utils/Card/Card";
import { IoBookmark } from "@react-icons/all-files/io5/IoBookmark";
import Chip from "../../../components/utils/Chip/Chip";

const CreativeCard = () => {
  return (
    <Card withShadow>
      <div className={hstack({ alignItems: "start", gap: "3rem" })}>
        <div className={css({ position: "relative", width: "100%" })}>
          <img
            className={css({
              position: "relative",
              borderRadius: "15px",
              border: "solid 2px #000",
              h: "100%",
              zIndex: "3",
            })}
            src="https://cdn.dribbble.com/userupload/8428633/file/original-d2aeaad756369abffb3da32d979ecb7d.jpg?resize=500x500"
            alt=""
          />
          <span
            className={css({
              position: "absolute",
              border: "solid 2px #000",
              width: "100%",
              height: "100%",
              top: "0",
              borderRadius: "15px",
              backgroundColor: "purple",
              zIndex: "2",
              left: ".75rem",
            })}
          />
          <span
            className={css({
              position: "absolute",
              border: "solid 2px #000",
              width: "100%",
              height: "100%",
              top: "0",
              borderRadius: "15px",
              backgroundColor: "blue",
              zIndex: "1",
              left: "1.5rem",
            })}
          />
        </div>
        <div className={vstack({ alignItems: "start" })}>
          <div className={hstack({ alignItems: "center" })}>
            <img
              className={css({
                border: "solid 2px #000",
                borderRadius: "20px",
                width: "4rem",
              })}
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div className={vstack({ gap: "0", alignItems: "start" })}>
              <h2
                className={css({
                  textStyle: "body",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                })}
              >
                Vincent Lainé
              </h2>
              <span className={css({ textStyle: "body", color: "purple" })}>
                @vincentlaine25
              </span>
            </div>
          </div>
          <div className={hstack({ gap: ".25rem" })}>
            <Chip>3D</Chip>
            <Chip>Typographie</Chip>
            <Chip>Illustration</Chip>
          </div>
          <p className={css({ textStyle: "body" })}>
            Nullam convallis lorem et leo elementum tempor. Curabitur a est
            risus. Proin eleifend elit luctus lorem porta, sit amet vulputate
            diam varius.
          </p>
          <div className={hstack({ marginTop: "auto", alignSelf: "end" })}>
            <Button variant="danger">
              <IoBookmark />
            </Button>
            <Button>Voir le portfolio</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CreativeCard;
