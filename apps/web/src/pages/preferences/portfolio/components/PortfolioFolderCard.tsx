import Card from "#root/src/components/utils/Card/Card";
import { css } from "#root/styled-system/css";
import { PortfolioFolder } from "#root/types/portfolio";
import { useState } from "react";
import { animated, useSpring } from "@react-spring/web";

interface PortfolioFolderCardProps
  extends React.BaseHTMLAttributes<HTMLDivElement> {
  portfolioFolder: PortfolioFolder;
}

export const PortfolioFolderCard = (
  portfolioFolderCardProps: PortfolioFolderCardProps,
) => {
  const { portfolioFolder } = portfolioFolderCardProps;
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const firstCardStyle = useSpring({
    top: isHovered ? "1rem" : "0",
    transform: isHovered ? "rotate(3deg)" : "rotate(0deg)",
  });

  const secondCardStyle = useSpring({
    top: isHovered ? "0.75rem" : "0",
    transform: isHovered ? "rotate(-3deg)" : "rotate(0deg)",
  });

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={css({ pos: "relative", w: "100%" })}
      {...portfolioFolderCardProps}
    >
      <Card
        css={{
          h: "18rem",
          pos: "relative",
          cursor: "pointer",
          w: "100%",
          p: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          zIndex: 3,
        }}
      >
        {portfolioFolder.portfolioImages!.length > 0 ? (
          <Card css={{ width: "100%" }}>
            <img
              className={css({
                objectFit: "cover",
                h: "12rem",
                w: "100%",
              })}
              src={
                import.meta.env.VITE_API_URL +
                "uploads/portfolio/images/" +
                portfolioFolder.portfolioImages![0]?.image
              }
              alt={portfolioFolder.portfolioImages![0].title}
            />
          </Card>
        ) : (
          <Card css={{ h: "12rem", w: "100%", backgroundColor: "gray" }}>
            <></>
          </Card>
        )}
        <div>
          <h3>{portfolioFolder.title}</h3>
        </div>
      </Card>

      <animated.span
        className={css({
          position: "absolute",
          border: "solid 2px #000",
          width: "100%",
          height: "100%",
          borderRadius: "15px",
          backgroundColor: "purple",
          zIndex: "2",
        })}
        style={firstCardStyle}
      />
      <animated.span
        className={css({
          position: "absolute",
          border: "solid 2px #000",
          width: "100%",
          height: "100%",
          borderRadius: "15px",
          backgroundColor: "blue",
          zIndex: "1",
        })}
        style={secondCardStyle}
      />
    </div>
  );
};
