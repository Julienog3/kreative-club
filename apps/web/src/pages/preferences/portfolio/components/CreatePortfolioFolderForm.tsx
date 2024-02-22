import { useCreatePortfolioFolder } from "#root/src/api/portfolio/createPortfolioFolder";
import Button from "#root/src/components/utils/Button/Button";
import Input from "#root/src/components/utils/Input/Input";
import { useStoreModal } from "#root/src/components/utils/Modal/Modal.store";
import { usePageContext } from "vike-react/usePageContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const createPortfolioFolderSchema = z.object({
  title: z.string().min(4),
  description: z.string().nullable(),
});

export const CreatePortfolioFolderForm = () => {
  const { register, handleSubmit, control } = useForm({
    resolver: zodResolver(createPortfolioFolderSchema),
  });

  // const queryClient = useQueryClient();
  const { user } = usePageContext();

  const createPortfolioFolder = useCreatePortfolioFolder(user.id);

  const { closeModal } = useStoreModal((state) => state);

  const onSubmit: SubmitHandler<FieldValues> = ({ title, description }) => {
    const payload = new FormData();

    payload.append("title", title);
    payload.append("description", description);
    payload.append("userId", user.id);

    createPortfolioFolder.mutate(payload);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="title" control={control} register={register} required />
      <Input label="description" control={control} register={register} />
      <Button type="submit">Ajouter</Button>
    </form>
  );
};
