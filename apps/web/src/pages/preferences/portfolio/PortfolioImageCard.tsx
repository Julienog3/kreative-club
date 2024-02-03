import Button from "#root/src/components/utils/Button/Button";
import Card from "#root/src/components/utils/Card/Card";
import { css } from "#root/styled-system/css";
import { PortfolioImage } from "#root/types/portfolio";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";

type PortfolioImageCardProps = {
  portfolioImage: PortfolioImage;
  onDelete: () => void;
};

export const PortfolioImageCard = ({
  portfolioImage,
  onDelete,
}: PortfolioImageCardProps) => {
  return (
    <Card css={{ h: "18rem", pos: "relative", cursor: "pointer" }}>
      <div className={css({ pos: "absolute", right: 0, p: ".5rem" })}>
        <Button variant="danger" onClick={onDelete}>
          <AiOutlineClose />
        </Button>
      </div>
      <img
        className={css({
          objectFit: "cover",
          h: "100%",
          w: "100%",
        })}
        src={import.meta.env.VITE_API_URL + portfolioImage?.image?.url.slice(1)}
        alt={portfolioImage.title}
      />
    </Card>
  );
};
