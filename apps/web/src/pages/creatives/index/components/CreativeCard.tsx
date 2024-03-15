import { css } from "../../../../../styled-system/css";
import { hstack, vstack } from "../../../../../styled-system/patterns";
import Button from "../../../../components/utils/Button/Button";
import Card from "../../../../components/utils/Card/Card";
import { IoBookmarkOutline } from "@react-icons/all-files/io5/IoBookmarkOutline";
import Chip from "../../../../components/utils/Chip/Chip";
import { User } from "#root/src/api/user";
import { Link } from "#root/src/components/Link";
import { usePortfolioIllustrationQuery } from "#root/src/api/portfolio/getPortfolioIllustration";
import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { useAddBoomarkQuery } from "#root/src/api/bookmarks/addBookmark";

interface CreativeCardProps extends User {}

const CreativeCard = (props: CreativeCardProps) => {
  const { data: portfolioImage } = usePortfolioIllustrationQuery(props.id);
  const { userToken } = usePageContext();
  const addBookmark = useAddBoomarkQuery(userToken);

  const getIllustrationUrl = () => {
    if (!portfolioImage) return;

    return (
      import.meta.env.VITE_API_URL.slice(0, -1) +
      "/uploads/portfolio/images/" +
      portfolioImage.image
    );
  };

  const handleAddBookmark = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    addBookmark.mutate(props.id);
  };

  return (
    <Link
      href={`/creatives/${props.username}`}
      className={css({ borderRadius: "13px" })}
    >
      <Card css={{ p: "1rem" }}>
        <div className={vstack({ alignItems: "start" })}>
          <div className={css({ position: "relative", width: "100%" })}>
            <div
              className={css({
                position: "absolute",
                zIndex: 999,
                top: "1rem",
                right: "1rem",
              })}
            >
              <Button variant="danger" onClick={(e) => handleAddBookmark(e)}>
                <IoBookmarkOutline />
              </Button>
            </div>
            <img
              className={css({
                position: "relative",
                borderRadius: "15px",
                border: "solid 2px #000",
                w: "100%",
                h: "14rem",
                objectFit: "cover",
                zIndex: "3",
              })}
              src={getIllustrationUrl()}
              alt=""
            />
          </div>
          <div className={vstack({ alignItems: "start" })}>
            {props.categories && props.categories.length > 0 && (
              <div className={hstack({ gap: ".25rem", flexWrap: "wrap" })}>
                {props.categories.map(({ id, title }) => (
                  <Chip key={id}>{title}</Chip>
                ))}
              </div>
            )}
            <p className={css({ textStyle: "body" })}>
              Nullam convallis lorem et leo elementum tempor. Curabitur a est
              risus.
            </p>
            <span
              className={css({ w: "100%", h: "2px", background: "black" })}
            />
            <div
              className={hstack({
                alignItems: "center",
              })}
            >
              <img
                className={css({
                  border: "solid 2px #000",
                  borderRadius: "12px",
                  width: "3rem",
                  height: "3rem",
                })}
                src={import.meta.env.VITE_API_URL.slice(0, -1) + props?.avatar}
                alt=""
              />
              <div className={vstack({ gap: "0", alignItems: "start" })}>
                <h2
                  className={css({
                    textStyle: "body",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  })}
                >
                  {props.firstName} {props.lastName}
                </h2>
                <span
                  className={css({
                    textStyle: "body",
                    fontSize: ".85rem",
                    color: "purple",
                  })}
                >
                  @{props.username}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CreativeCard;
