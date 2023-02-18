import { useEffect, useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { filterTable } from "./DataTable.style";
import { Link } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { fetchFiltersData } from "src/config/api/tagsApi/tagsApi";
import { useAppSelector } from "src/store/hooks";
import { fetchTags } from "src/store/thunks/tagThunks/fetchTags";
import useThunk from "src/hooks/useThunk";

const FilterTable = function ({
  typeOperation,
  setFilterData,
  perPage,
  offset,
}: any) {
  const [searchTerm, setSearchTerm] = useState<string>();
  const { data } = useAppSelector((state) => state.tags);
  const [doFetchTags] = useThunk(fetchTags);
  const handleSearch = function (e: any) {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    const fetchFilter = async () => {
      const title = searchTerm || undefined;
      if (searchTerm) {
        const pagination = { offset: 1, limit: perPage };
        fetchFiltersData(pagination, title).then((res) =>
          setFilterData(res.data.data)
        );
      } else if (searchTerm === "") {
        const pagination = { offset, limit: perPage };
        await doFetchTags(pagination);
        setFilterData(null);
      }
    };
    fetchFilter();
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
