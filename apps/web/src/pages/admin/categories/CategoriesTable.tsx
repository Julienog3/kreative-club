import { Category } from "#root/types/category";
import { css } from "#root/styled-system/css";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { RowActions } from "./RowActions";

interface CategoriesTableProps {
  data: Category[];
}

const columnHelper = createColumnHelper<Category>();
const columns = [
  columnHelper.accessor("id", {
    header: () => "Id",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("title", {
    header: () => "Label",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: () => "Date de création",
    cell: (info) => <span>{new Date(info.getValue()).toLocaleString()}</span>,
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => <RowActions row={props.row} />,
  }),
];

export const CategoriesTable = ({ data }: CategoriesTableProps) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table
        className={css({
          border: "solid 3px black",
          borderRadius: "10px",
          textStyle: "body",
          // borderSpacing: 0,
          borderCollapse: "separate",
          // overflow: "hidden",
        })}
      >
        <thead className={css({ borderBottom: "3px solid black" })}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={css({ p: "1rem" })}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={css({ p: ".5rem" })}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={css({
                borderBottom: "3px solid black",
              })}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={css({ p: ".5rem" })}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
