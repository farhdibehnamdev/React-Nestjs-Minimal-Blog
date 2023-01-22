import { TableBody, TableRow, TableCell, Grid, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IDataTableProps } from "./DataTable.type";
const DataTableBody: React.FC<IDataTableProps> = function ({
  rows,
}): JSX.Element {
  return (
    <TableBody>
      {rows.map((row: any, i: number) => (
        <TableRow
          key={i}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
          }}
        >
          <TableCell component="th" align="center" scope="row">
            {++i}
          </TableCell>
          <TableCell component="th" align="center" scope="row">
            {row.title}
          </TableCell>
          <TableCell align="center">{row.description}</TableCell>
          <TableCell align="center">
            <Grid container justifyContent="center">
              <Grid item xl={3}>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteOutlineOutlinedIcon />}
                >
                  حذف
                </Button>
              </Grid>
              <Grid item xl={3}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<EditOutlinedIcon />}
                >
                  ویرایش
                </Button>
              </Grid>
            </Grid>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default DataTableBody;
