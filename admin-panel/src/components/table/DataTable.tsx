import {
  TableContainer,
  Table,
  Box,
  Grid,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import dataTableMUI, { tableContainerStyle } from "./DataTable.style";
import DataTableHead from "./DataTableHead";
import DataTableBody from "./DataTableBody";
import TablePagination from "./TablePagination";
import usePagination from "src/hooks/usePagination";
import React, { useEffect, useState } from "react";
import useThunk from "src/hooks/useThunk";
import { fetchTags } from "src/store/thunks/tagThunks/fetchTags";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import FilterTable from "./FilterTable";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const DataTable = function ({
  columns,
  rows,
  count,
  typeOperation,
  thunkFunction,
}: any) {
  const [offset, setOffset] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [filterData, setFilterData] = useState<any>();
  const { isLoading } = useSelector((state: any) => state.tags);
  const [doFetchTags, isFetchLoading, isFetchCreatedError] =
    useThunk(fetchTags);
  const pageNumber = Math.ceil(count / perPage);
  const _DATA = usePagination(rows, perPage);
  const handleChange = async function (page: number = offset) {
    setOffset(page);
    await doFetchTags({ offset: page, limit: perPage });
    _DATA.jump(page);
  };
  const handleChangeRowCount = function (rowCount: number = perPage) {
    setOffset(1);
    setPerPage(rowCount);
    doFetchTags({ offset: 1, limit: rowCount });
    _DATA.jump(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (rows.length < 1) {
        setOffset(pageNumber);
        if (offset > 0) {
          await doFetchTags({ offset, limit: perPage });
        }
      }
    };
    fetchData();
  }, [pageNumber, offset, rows, doFetchTags, perPage]);
  return (
    <>
      <FilterTable
        typeOperation={typeOperation}
        setFilterData={setFilterData}
        perPage={perPage}
      />
      <Grid sx={dataTableMUI}>
        <TableContainer sx={tableContainerStyle}>
          <Table stickyHeader aria-label="sticky table">
            <DataTableHead columns={columns} />
            {isLoading ? (
              <TableBody
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "40%",
                }}
              >
                <TableRow>
                  <TableCell>
                    <CircularProgress sx={{ color: "#8d8d91" }} />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : isFetchCreatedError ? (
              <TableBody
                style={{
                  position: "absolute",
                  left: "40%",
                  bottom: "40%",
                }}
              >
                <TableRow>
                  <TableCell align="center">
                    <ErrorOutlineIcon
                      fontSize="large"
                      style={{ color: "red" }}
                    />
                    <Typography variant="h1" fontSize="15px">
                      مشکلی در دریافت اطلاعات بوجود آمده است
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <DataTableBody
                rows={_DATA.currentData()}
                offset={offset}
                perPage={perPage}
                filterData={filterData}
              />
            )}
          </Table>
        </TableContainer>
      </Grid>
      <TablePagination
        count={pageNumber}
        handleChange={handleChange}
        setPerPage={setPerPage}
        page={offset}
        perPage={perPage}
        handleChangeRowCount={handleChangeRowCount}
      />
    </>
  );
};

export default DataTable;
