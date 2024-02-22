import Button from "#root/src/components/utils/Button/Button";
import { hstack } from "#root/styled-system/patterns";
import { Category } from "#root/types/category";
import { Row } from "@tanstack/react-table";
import { RiDeleteBin5Fill } from "@react-icons/all-files/ri/RiDeleteBin5Fill";
import { FaPencilAlt } from "@react-icons/all-files/fa/FaPencilAlt";
import { useDeleteCategory } from "#root/src/api/categories/deleteCategory";

interface RowActionsProps {
  row: Row<Category>;
}

export const RowActions = ({ row }: RowActionsProps) => {
  const deleteCategory = useDeleteCategory();

  return (
    <div className={hstack()}>
      <Button>
        <FaPencilAlt />
      </Button>
      <Button
        variant="danger"
        onClick={(): void => deleteCategory.mutate(row.original.id)}
      >
        <RiDeleteBin5Fill />
      </Button>
    </div>
  );
};
