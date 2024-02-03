export type Attachment = {
  name: string;
  size: number;
  extname: string;
  mimeType: string;
  url: string;
};

export interface BaseModel {
  createdAt: string;
  updatedAt: string;
  id: string;
}
