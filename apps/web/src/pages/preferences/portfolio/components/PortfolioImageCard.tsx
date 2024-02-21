import Button from "#root/src/components/utils/Button/Button";
import Card from "#root/src/components/utils/Card/Card";
import { css } from "#root/styled-system/css";
import { PortfolioImage } from "#root/types/portfolio";
import { useState } from "react";
import { RiDeleteBin5Fill } from "@react-icons/all-files/ri/RiDeleteBin5Fill";
import { animated, useSpring } from "@react-spring/web";
import { useDeletePortfolioImage } from "#root/src/api/portfolio/deletePortfolioImage";

type PortfolioImageCardProps = {
  portfolioImage: PortfolioImage;
  // onDelete: (portfolioImageId: string) => void;
};

export const PortfolioImageCard = ({
  portfolioImage, // onDelete,
}: PortfolioImageCardProps) => {
  const deletePortfolioImage = useDeletePortfolioImage(
    portfolioImage?.portfolioFolderId,
  );
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);

  const buttonStyle = useSpring({
    opacity: isCardHovered ? "1" : "0",
    transform: isCardHovered ? "scale(1)" : "scale(0)",
  });

  return (
    <Card
      css={{ h: "18rem", pos: "relative", cursor: "pointer", w: "100%" }}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      {isCardHovered && (
        <animated.div
          className={css({ pos: "absolute", right: 0, p: ".5rem" })}
          style={buttonStyle}
        >
          <Button
            variant="danger"
            onClick={() => deletePortfolioImage.mutate(portfolioImage.id)}
          >
            <RiDeleteBin5Fill />
          </Button>
        </animated.div>
      )}
      <img
        className={css({
          objectFit: "cover",
          h: "100%",
          w: "100%",
        })}
        src={
          import.meta.env.VITE_API_URL +
          "uploads/portfolio/images/" +
          portfolioImage?.image
        }
        alt={portfolioImage.title}
      />
    </Card>
  );
};
