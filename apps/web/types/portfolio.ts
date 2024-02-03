import { Attachment, BaseModel } from ".";

export interface PortfolioImage extends BaseModel {
  title: string;
  image: Attachment;
  userId: string;
}
