import React, { useEffect, useReducer } from "react";
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
import { DataTableReducer, initialState } from "./DataTable.reducer";
import {
  SET_FILTER_DATA,
  SET_OFFSET,
  SET_PER_PAGE,
  SET_SEARCH_TERM,
} from "./constants";

const DataTable = function ({
  columns,
  rows,
  count,
  typeOperation,
  thunkFetch,
  thunkRemove,
  dataSelector,
}: any) {
  const [state, dispatch] = useReducer(DataTableReducer, initialState);
  const [doFetchItems, isFetchLoading, isFetchCreatedError] =
    useThunk(thunkFetch);
  const pageNumber = Math.ceil(count / state.perPage);
  const _DATA = usePagination(rows, state.perPage);
  const handleChange = async function (page: number = state.offset) {
    dispatch({ type: SET_OFFSET, payload: page });
    await doFetchItems({ offset: page, limit: state.perPage });
    dispatch({ type: SET_FILTER_DATA, payload: undefined });
    _DATA.jump(page);
  };
  const handleChangeRowCount = function (rowCount: number = state.perPage) {
    dispatch({ type: SET_OFFSET, payload: 1 });
    dispatch({ type: SET_PER_PAGE, payload: rowCount });
    doFetchItems({ all: false, offset: 1, limit: rowCount });
    _DATA.jump(1);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (rows.length === 0 && pageNumber > 0) {
        if (isMounted) {
          await doFetchItems({
            all: false,
            offset: pageNumber,
            limit: state.perPage,
          });
          dispatch({ type: "SET_OFFSET", payload: pageNumber });
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [state.offset, rows, doFetchItems, state.perPage, pageNumber]);
  return (
    <>
      <FilterTable
        typeOperation={typeOperation}
        setFilterData={(data: any) =>
          dispatch({ type: SET_FILTER_DATA, payload: data })
        }
        thunkFetch={thunkFetch}
        perPage={state.perPage}
        offset={state.offset}
        dataSelector={dataSelector}
        setSearchTerm={(term: string) =>
          dispatch({ type: SET_SEARCH_TERM, payload: term })
        }
        searchTerm={state.searchTerm}
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
                columns={columns}
                thunkFetch={thunkFetch}
                thunkRemove={thunkRemove}
                rows={_DATA.currentData()}
                offset={state.offset}
                currentPageNumber={pageNumber}
                perPage={state.perPage}
                filterData={state.filterData}
                setFilterData={(data: any) =>
                  dispatch({ type: SET_FILTER_DATA, payload: data })
                }
                setSearchTerm={(term: string) =>
                  dispatch({ type: SET_SEARCH_TERM, payload: term })
                }
              />
            )}
          </Table>
        </TableContainer>
      </Grid>
      <TablePagination
        count={pageNumber}
        handleChange={handleChange}
        page={state.offset}
        perPage={state.perPage}
        handleChangeRowCount={handleChangeRowCount}
      />
    </>
  );
};

export default DataTable;
