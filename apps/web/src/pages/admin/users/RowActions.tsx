import { User } from "#root/src/api/user";
import Button from "#root/src/components/utils/Button/Button";
import { hstack } from "#root/styled-system/patterns";
import { Row } from "@tanstack/react-table";

interface RowActionsProps {
  row: Row<User>;
}

export const RowActions = ({ row }: RowActionsProps) => {
  return (
    <div className={hstack()}>
      <Button>Editer</Button>
      <Button variant="danger">Supprimer</Button>
    </div>
  );
};
