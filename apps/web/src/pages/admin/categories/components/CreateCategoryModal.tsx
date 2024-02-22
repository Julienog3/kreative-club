import { useCreateCategory } from "#root/src/api/categories/createCategory";
import Button from "#root/src/components/utils/Button/Button";
import Input from "#root/src/components/utils/Input/Input";
import Modal, {
  modalTransitionConfig,
} from "#root/src/components/utils/Modal/Modal";
import { hstack, vstack } from "#root/styled-system/patterns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "@react-spring/web";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";

interface CreatePortfolioItemModalProps {
  isShowed: boolean;
  closeModal: () => void;
}

const createCategorySchema = z.object({
  title: z.string(),
});

type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;

export const CreateCategoryModal = ({
  isShowed,
  closeModal,
}: CreatePortfolioItemModalProps) => {
  const modalTransition = useTransition(isShowed, modalTransitionConfig);
  const createCategory = useCreateCategory();

  const methods = useForm<FieldValues>({
    resolver: zodResolver(createCategorySchema),
  });

  const { handleSubmit, register, control } = methods;

  const onSubmit: SubmitHandler<FieldValues> = (newCategory): void => {
    createCategory.mutate(newCategory as CreateCategoryFormValues);
    closeModal();
  };

  return (
    <>
      {modalTransition((style, isOpened) => (
        <>
          {isOpened && (
            <Modal
              title="Ajouter une catégorie"
              style={{ ...style }}
              onClose={() => {
                closeModal();
              }}
            >
              <FormProvider {...methods}>
                <form
                  className={vstack({
                    gap: "1rem",
                    w: "100%",
                    alignItems: "start",
                  })}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    label="title"
                    required
                    register={register}
                    control={control}
                  />
                  <div className={hstack({ justifyContent: "end", w: "100%" })}>
                    <Button disabled>Annuler</Button>
                    <Button type="submit">Ajouter</Button>
                  </div>
                </form>
              </FormProvider>
            </Modal>
          )}
        </>
      ))}
    </>
  );
};
