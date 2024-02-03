import { api } from ".";

export const createPortfolioImage = async (
  payload: FormData,
): Promise<void> => {
  try {
    await api.post("portfolio-images", { body: payload }).json();
  } catch (err) {
    console.error(err);
  }
  // console.log({ json });
};

export const deletePortfolioImage = async (id: string): Promise<void> => {
  await api.delete(`portfolio-images/${id}`).json();
};
