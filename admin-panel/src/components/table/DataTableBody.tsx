import { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { TableBody } from "@mui/material";
import { IDataTableProps } from "./DataTable.type";
import DeleteModalConfirm from "src/components/modal/DeleteModalConfirm";
import { openModal } from "src/store/slices/modal/modalSlice";
import { useNavigate } from "react-router-dom";
import DataTableRow from "./DataTableRow";
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
        {data.map((row: any, index: number) => (
          <DataTableRow
            row={row}
            columns={columns}
            perPage={perPage}
            offset={offset}
            index={index}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </TableBody>
    </>
  );
};

export default DataTableBody;
