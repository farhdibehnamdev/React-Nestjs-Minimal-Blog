import { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import {
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Button,
  ButtonGroup,
  Chip,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IDataTableProps } from "./DataTable.type";
import DeleteModalConfirm from "src/components/modal/DeleteModalConfirm";
import { openModal } from "src/store/slices/modal/modalSlice";
import { useNavigate } from "react-router-dom";
import { rowNumber } from "src/utils/rowTableNumber";
const DataTableBody: React.FC<IDataTableProps> = function ({
  rows,
  perPage,
  offset,
  setPage,
  filterData,
  thunkFetch,
  thunkRemove,
  currentPageNumber,
  setFilterData,
  columns,
  setSearchTerm,
}: any): JSX.Element {
  const { isOpen } = useAppSelector((state) => state.modal);
  const [state, setState] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = filterData || rows;
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
          currentPageNumber={currentPageNumber}
          thunkFetch={thunkFetch}
          thunkRemove={thunkRemove}
          setFilterData={setFilterData}
        />
      )}
      <TableBody>
        {data.map((row: any, i: number) => (
          <TableRow
            key={row.id}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell align="center" scope="row">
              {rowNumber(offset, perPage, i)}
            </TableCell>
            {columns.map((column: any) => (
              <TableCell key={column.id} align="center" scope="row">
                {row[column.field]}
              </TableCell>
            ))}

            <TableCell align="center">
              {row.isPublished ? (
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
