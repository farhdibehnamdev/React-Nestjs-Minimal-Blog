import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { filterTable } from "./DataTable.style";
import { Link } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";
import { fetchTagsData } from "src/config/api/tagsApi/tagsApi";

const FilterTable = function ({ typeOperation, setFilterData, perPage }: any) {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const handleSearch = function (e: any) {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    const pagination = { offset: 0, limit: perPage };
    fetchTagsData(pagination, searchTerm).then((res) =>
      setFilterData(res.data.data)
    );
  }, [searchTerm]);
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
          onChange={handleSearch}
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
