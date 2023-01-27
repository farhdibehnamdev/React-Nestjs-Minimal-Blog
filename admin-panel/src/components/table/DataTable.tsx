import {
  Paper,
  TableContainer,
  Table,
  Box,
  Button,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import dataTableMUI, {
  filterTable,
  tableContainerStyle,
} from "./DataTable.style";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DataTableHead from "./DataTableHead";
import DataTableBody from "./DataTableBody";
import { Link } from "react-router-dom";
import TablePagination from "./TablePagination";
import usePagination from "src/hooks/usePagination";
import { useState } from "react";
import useThunk from "src/hooks/useThunk";
import { fetchTags } from "src/store/thunks/tagThunks/fetchTags";
const DataTable = function ({ columns, rows, count, typeOperation }: any) {
  const [offset, setOffset] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [doFetchTags, isLoading, loadingTagsError] = useThunk(fetchTags);
  const pageCount = Math.ceil(count / perPage);
  const _DATA = usePagination(rows, perPage);

  const handleChange = function (page: number = offset) {
    setOffset(page);
    if (typeof doFetchTags === "function") {
      doFetchTags({ offset: page, limit: perPage });
    }
    _DATA.jump(page);
  };

  const handleChangeRowCount = function (rowCount: number = perPage) {
    setOffset(1);
    setPerPage(rowCount);
    if (typeof doFetchTags === "function") {
      doFetchTags({ offset: 1, limit: rowCount });
    }
    _DATA.jump(1);
  };
  return (
    <>
      <Box sx={filterTable}>
        <Link to="add" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddOutlinedIcon />}
          >
            <Typography sx={{ color: "#fff" }}>
              افزودن {typeOperation}
            </Typography>
          </Button>
        </Link>

        <Box>
          <TextField
            id="standard-search"
            placeholder="جستجو"
            type="search"
            variant="outlined"
            hiddenLabel
            InputLabelProps={{
              disableAnimation: true,
              shrink: false,
            }}
            className="textFieldFilterStyle"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
              className: "filterTableHeaderInputPropsStyle",
            }}
          />
        </Box>
      </Box>
      <Grid sx={dataTableMUI}>
        <TableContainer sx={tableContainerStyle}>
          <Table stickyHeader aria-label="sticky table">
            <DataTableHead columns={columns} />
            <DataTableBody
              rows={_DATA.currentData()}
              offset={offset}
              perPage={perPage}
            />
          </Table>
        </TableContainer>
      </Grid>
      <TablePagination
        count={pageCount}
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
