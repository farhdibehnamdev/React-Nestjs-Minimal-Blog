import {
  Button,
  ButtonGroup,
  Grid,
  TableCell,
  TableRow,
  Chip,
} from "@mui/material";
import { rowNumber } from "src/utils/rowTableNumber";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { tableRowStyle } from "./DataTable.style";
import { UserRole } from "src/config/api/usersApi/usersApi";
import { chipStyle } from "./DataTable.style";
const DataTableRow = function ({
  columns,
  row,
  offset,
  perPage,
  index,
  handleEdit,
  handleDelete,
}: any) {
  const booleanColumn = ({ row, column }: any) => (
    <Chip
      sx={chipStyle}
      label={row[column.field] ? "فعال" : "غیرفعال"}
      color={row[column.field] ? "info" : "error"}
    />
  );

  const imageColumn = ({ row, column }: any) => column.render(row, column);

  const operationColumn = ({ row, column }: any) => (
    <Grid textAlign="center">
      <Grid item>
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button
            variant="contained"
            sx={{ color: "#fff", background: "#ee3b3b" }}
            startIcon={<DeleteOutlineOutlinedIcon />}
            onClick={() => handleDelete(row)}
          >
            حذف
          </Button>
          <Button
            variant="contained"
            sx={{ background: "#27ed8d", color: "#2d2c2c" }}
            startIcon={<EditOutlinedIcon />}
            onClick={() => handleEdit(row.id)}
          >
            ویرایش
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );

  const bodyColumn = ({ row, column }: any) => (
    <Button color="info">...</Button>
  );

  const enumColumn = ({ row, column }: any) => {
    return (
      <Chip
        sx={chipStyle}
        label={row[column.field] === UserRole.ADMIN ? "مدیر" : "کاربر"}
        color={row[column.field] === UserRole.ADMIN ? "warning" : "secondary"}
      />
    );
  };

  const getCellContent = function (row: any, column: any) {
    switch (column.type) {
      case "boolean":
        return booleanColumn({ row, column });
      case "image":
        return imageColumn({ row, column });
      case "string":
        return row[column.field];
      case "number":
        return row[column.field];
      case "date":
        return row[column.field];
      case "operation":
        return operationColumn({ row, column });
      case "body":
        return bodyColumn({ row, column });
      case "enum":
        return enumColumn({ row, column });
      default:
        break;
    }
  };

  return (
    <TableRow sx={tableRowStyle}>
      <TableCell align="center" scope="row">
        {rowNumber(offset, perPage, index)}
      </TableCell>
      {columns.map((column: any) => {
        return column.field === "colId" ? null : (
          <TableCell key={column.colId} align="center" scope="row">
            {getCellContent(row, column)}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default DataTableRow;
