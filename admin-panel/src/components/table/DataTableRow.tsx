import { Button, ButtonGroup, Grid, TableCell, TableRow } from "@mui/material";
import Chip from "@mui/material/Chip";
import { rowNumber } from "src/utils/rowTableNumber";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { generateThumbnail } from "src/utils/generateThumbnail";

const DataTableRow = function ({
  columns,
  row,
  offset,
  perPage,
  index,
  handleEdit,
  handleDelete,
}: any) {
  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell align="center" scope="row">
        {rowNumber(offset, perPage, index)}
      </TableCell>
      {columns.map((column: any) => {
        return column.field === "colId" ? null : (
          <TableCell key={column.colId} align="center" scope="row">
            {column.field === "isPublished" && row[column.field] ? (
              <Chip
                label="فعال"
                color="success"
                sx={{
                  padding: "6px",
                  fontWeight: "bold",
                  fontFamily: "IRANYekan",
                  fontSize: "12px",
                  backgroundColor: "#27ed8d",
                }}
              />
            ) : column.field === "image" ? (
              <img
                src={generateThumbnail(row[column.field])}
                width={50}
                height={50}
                alt="main_image_photo"
              />
            ) : column.field === "body" ? (
              <Button color="info">...</Button>
            ) : column.field === "operation" ? (
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
            ) : column.field !== "isPublished" ? (
              row[column.field]
            ) : (
              <Chip
                label="غیر فعال"
                color="error"
                sx={{
                  padding: "6px",
                  fontWeight: "bold",
                  fontFamily: "IRANYekan",
                  fontSize: "12px",
                  backgroundColor: "#ed2727",
                }}
              />
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default DataTableRow;
