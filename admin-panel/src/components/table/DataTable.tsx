import { useState } from "react";
import {
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table as TableMui,
  TableBody,
  Box,
  Button,
  Typography,
  Pagination,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import dataTableMUI, { filterTable } from "./DataTable.style";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const DataTable = function () {
  const [pageCount, setPageCount] = useState<string>("5");

  const handleChange = (event: SelectChangeEvent) => {
    setPageCount(event.target.value);
  };
  return (
    <>
      <Box sx={filterTable}>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddOutlinedIcon />}
        >
          <Typography sx={{ color: "#fff" }}>افزودن فهرست</Typography>
        </Button>

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
          {/* rgba(0,0,0,.05) */}
          <TableHead sx={{ background: "rgba(34, 185, 255, 0.3)" }}>
            <TableRow>
              <TableCell align="center">Dessert (100g serving)</TableCell>
              <TableCell align="center">Calories</TableCell>
              <TableCell align="center">Fat&nbsp;(g)</TableCell>
              <TableCell align="center">Carbs&nbsp;(g)</TableCell>
              <TableCell align="center">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" align="center" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableMui>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={10}
            variant="outlined"
            color="primary"
            shape="rounded"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>نمایش</Typography>
          <FormControl
            sx={{
              display: "flex",
              justifyContent: "space-between",
              m: 1,
              minWidth: 100,
            }}
            fullWidth
            size="small"
          >
            <InputLabel id="demo-simple-select-label">تعداد</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pageCount}
              label="page"
              onChange={handleChange}
            >
              <MenuItem defaultValue={5} value={5}>
                5
              </MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={40}>40</MenuItem>
            </Select>
          </FormControl>
          <Typography>رکورد</Typography>
        </Box>
      </Box>
    </>
  );
};

export default DataTable;
