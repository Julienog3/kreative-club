import { createPortfolioImage } from "#root/src/api/portfolioImage";
import { useSnackbarStore } from "#root/src/components/layout/Snackbar/Snackbar.store";
import Button from "#root/src/components/utils/Button/Button";
import Input from "#root/src/components/utils/Input/Input";
import { useStoreModal } from "#root/src/components/utils/Modal/Modal.store";
import { usePageContext } from "#root/src/renderer/usePageContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { reload } from "vike/client/router";
import { z } from "zod";

const createPortfolioSchema = z.object({
  title: z.string().min(4),
  image: z.any(),
});

export const CreatePortfolioForm = () => {
  const { register, handleSubmit, control } = useForm({
    resolver: zodResolver(createPortfolioSchema),
  });

  const queryClient = useQueryClient();
  const { user } = usePageContext();

  const { closeModal } = useStoreModal((state) => state);
  const { addItem } = useSnackbarStore((state) => state);

  const addPortfolioImage = useMutation({
    mutationFn: createPortfolioImage,
    onSuccess: () => {
      addItem({
        type: "success",
        message: "L'image a bien été ajouté !",
      });
      closeModal();
      reload();
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = ({ title, image }) => {
    console.log(title, image);
    const payload = new FormData();

    payload.append("title", title);
    payload.append("userId", user.id);
    payload.append("image", image[0]);

    addPortfolioImage.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="title" control={control} register={register} required />
      <input type="file" {...register("image", { required: true })} />
      <Button type="submit">Ajouter</Button>
    </form>
  );
};
