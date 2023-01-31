import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { filterTable } from "./DataTable.style";
import { Link } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const FilterTable = function ({ typeOperation }: any) {
  return (
    <Box sx={filterTable}>
      <Link to="add" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddOutlinedIcon />}
        >
          <Typography sx={{ color: "#fff" }}>افزودن {typeOperation}</Typography>
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
  );
};
export default FilterTable;
