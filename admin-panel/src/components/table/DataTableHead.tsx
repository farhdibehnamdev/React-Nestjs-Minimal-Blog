import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { IDataTableHeadProps } from "./DataTable.type";
const DataTableHead: React.FC<IDataTableHeadProps> = function ({
  columns,
}): JSX.Element {
  return (
    <TableHead sx={{ background: "rgba(34, 185, 255, 0.3)" }}>
      <TableRow>
        {columns.map((column) => {
          return (
            <TableCell key={column.id} align="center">
              {column.title}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default DataTableHead;
