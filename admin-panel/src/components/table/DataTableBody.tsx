import { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import {
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Button,
  ButtonGroup,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IDataTableProps } from "./DataTable.type";
import DeleteModalConfirm from "src/components/modal/DeleteModalConfirm";
import { openModal } from "src/store/slices/modal/modalSlice";
import { useNavigate } from "react-router-dom";
const DataTableBody: React.FC<IDataTableProps> = function ({
  rows,
  perPage,
  offset,
  setPage,
}: any): JSX.Element {
  const rowNumber = function (
    pageNum: any,
    rowsPerPage: any,
    index: number
  ): number {
    let result = pageNum > 1 ? pageNum * rowsPerPage - rowsPerPage : 1;
    result += index;
    return result;
  };
  const { isOpen } = useAppSelector((state) => state.modal);
  const [state, setState] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleDelete = function (row: any) {
    dispatch(openModal(true));
    setState(row);
  };

  const handleEdit = (id: number) => navigate(`edit/${id}`);

  return (
    <>
      {isOpen && (
        <DeleteModalConfirm
          state={state}
          perPage={perPage}
          offset={offset}
          setPage={setPage}
        />
      )}
      <TableBody>
        {rows.map((row: any, i: number) => (
          <TableRow
            key={row.id}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell component="th" align="center" scope="row">
              {rowNumber(offset, perPage, i)}
            </TableCell>
            <TableCell component="th" align="center" scope="row">
              {row.title}
            </TableCell>
            <TableCell align="center">{row.description}</TableCell>
            <TableCell align="center">
              <Grid container justifyContent="center">
                <Grid item xl={6}>
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                  >
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteOutlineOutlinedIcon />}
                      onClick={() => handleDelete(row)}
                    >
                      حذف
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<EditOutlinedIcon />}
                      onClick={() => handleEdit(row.id)}
                    >
                      ویرایش
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default DataTableBody;
