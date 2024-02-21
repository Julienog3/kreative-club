import { useCreatePortfolioImage } from "#root/src/api/portfolio/createPortfolioImage";
import Button from "#root/src/components/utils/Button/Button";
import { Dropzone } from "#root/src/components/utils/Dropzone/Dropzone";
import Input from "#root/src/components/utils/Input/Input";
import { useStoreModal } from "#root/src/components/utils/Modal/Modal.store";
import { usePageContext } from "#root/src/renderer/usePageContext";
import { hstack, vstack } from "#root/styled-system/patterns";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";

const createPortfolioSchema = z.object({
  title: z.string().min(4),
  image: z.any(),
});

interface CreatePortfolioFormProps {
  portfolioFolderId?: string;
}

export const CreatePortfolioForm = ({
  portfolioFolderId,
}: CreatePortfolioFormProps) => {
  const methods = useForm({
    resolver: zodResolver(createPortfolioSchema),
  });

  const { register, handleSubmit, control } = methods;

  const { user } = usePageContext();

  const { closeModal } = useStoreModal((state) => state);

  const createPortfolioImage = useCreatePortfolioImage({
    userId: user.id,
    portfolioFolderId,
  });

  const onSubmit: SubmitHandler<FieldValues> = ({ title, image }) => {
    const payload = new FormData();

    payload.append("title", title);
    payload.append("userId", user.id);
    payload.append("image", image[0]);

    if (portfolioFolderId) {
      payload.append("portfolioFolderId", portfolioFolderId);
    }

    createPortfolioImage.mutate(payload);
    closeModal();
  };

  return (
    <FormProvider {...methods}>
      <form
        className={vstack({ gap: "1rem", w: "100%", alignItems: "start" })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input label="title" control={control} register={register} required />
        <Dropzone label="image" options={{ required: true }} />
        {/* <input type="file" {...register("image", { required: true })} /> */}
        <div className={hstack({ justifyContent: "end", w: "100%" })}>
          <Button disabled>Annuler</Button>
          <Button type="submit">Ajouter</Button>
        </div>
      </form>
    </FormProvider>
  );
};
