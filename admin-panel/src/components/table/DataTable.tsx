import React, { createContext, useContext, useEffect, useState } from "react";
import {
  TableContainer,
  Table,
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
import useThunk from "src/hooks/useThunk";
import CircularProgress from "@mui/material/CircularProgress";
import FilterTable from "./FilterTable";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const DataTable = function ({
  columns,
  rows,
  count,
  typeOperation,
  thunkFetch,
  thunkRemove,
  dataSelector,
}: any) {
  const [offset, setOffset] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [filterData, setFilterData] = useState<any>();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [doFetchItems, isFetchLoading, isFetchCreatedError] =
    useThunk(thunkFetch);
  const pageNumber = Math.ceil(count / perPage);
  const _DATA = usePagination(rows, perPage);
  const handleChange = async function (page: number = offset) {
    setOffset(page);
    await doFetchItems({ pagination: { offset: page, limit: perPage } });
    setFilterData(undefined);
    _DATA.jump(page);
  };
  const handleChangeRowCount = function (rowCount: number = perPage) {
    setOffset(1);
    setPerPage(rowCount);
    doFetchItems({ offset: 1, limit: rowCount });
    _DATA.jump(1);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (rows.length === 0 && pageNumber > 0) {
        if (isMounted) {
          await doFetchItems({ offset: pageNumber, limit: perPage });
          setOffset(pageNumber);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [offset, rows, doFetchItems, perPage, pageNumber]);
  return (
    <>
      <FilterTable
        typeOperation={typeOperation}
        setFilterData={setFilterData}
        thunkFetch={thunkFetch}
        perPage={perPage}
        offset={offset}
        dataSelector={dataSelector}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      <Grid sx={dataTableMUI}>
        <TableContainer sx={tableContainerStyle}>
          <Table stickyHeader aria-label="sticky table">
            <DataTableHead columns={columns} />
            {isFetchLoading ? (
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
                thunkFetch={thunkFetch}
                thunkRemove={thunkRemove}
                rows={_DATA.currentData()}
                offset={offset}
                currentPageNumber={pageNumber}
                perPage={perPage}
                filterData={filterData}
                setFilterData={setFilterData}
                setSearchTerm={setSearchTerm}
              />
            )}
          </Table>
        </TableContainer>
      </Grid>
      <TablePagination
        count={pageNumber}
        handleChange={handleChange}
        page={offset}
        perPage={perPage}
        handleChangeRowCount={handleChangeRowCount}
      />
    </>
  );
};

export default DataTable;
