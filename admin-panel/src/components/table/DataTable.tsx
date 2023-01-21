import {
  Paper,
  TableContainer,
  Table as TableMui,
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import dataTableMUI, { filterTable } from "./DataTable.style";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DataTableHead from "./DataTableHead";
import DataTableBody from "./DataTableBody";
import { Link } from "react-router-dom";
import TablePagination from "./TablePagination";
const DataTable = function ({ columns, rows, typeOperation }: any) {
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
            label="جستجو"
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
      <TableContainer component={Paper} sx={dataTableMUI}>
        <TableMui
          sx={{
            minWidth: 650,
            border: "2px solid rgba(34, 185, 255, 0.3)",
          }}
          size="medium"
          aria-label="simple table"
        >
          <DataTableHead columns={columns} />
          <DataTableBody rows={rows} />
        </TableMui>
      </TableContainer>
      <TablePagination />
    </>
  );
};

export default DataTable;
