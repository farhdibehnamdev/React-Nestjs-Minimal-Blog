import { useEffect, useState } from "react";
import useThunk from "src/hooks/useThunk";
import { useAppSelector } from "src/store/hooks";
import { RootState } from "src/store";
import { Link } from "react-router-dom";
import { Box, Button, Typography, TextField } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { filterTable } from "./DataTable.style";

type FilteTableProps<T> = {
  typeOperation: string;
  setFilterData: Function;
  perPage: number;
  offset: number;
  thunkFetch: Function;
  setSearchTerm: Function;
  searchTerm: string | undefined;
  dataSelector: (state: RootState) => { data: T; isLoading: boolean };
};
const FilterTable = function <T>({
  typeOperation,
  setFilterData,
  perPage,
  offset,
  thunkFetch,
  dataSelector,
  setSearchTerm,
  searchTerm,
}: FilteTableProps<T>) {
  const [doFetchItems] = useThunk(thunkFetch);
  const { data, isLoading } = useAppSelector(dataSelector);
  let [isMounted, setIsMounted] = useState(false);
  const handleSearch = function (e: any) {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    const fetchFilter = async () => {
      const title = searchTerm || undefined;
      if (searchTerm) {
        const pagination = { offset: 1, limit: perPage };
        await doFetchItems({ pagination, title });
        setIsMounted(true);
      } else if (searchTerm === "") {
        const pagination = { offset, limit: perPage };
        await doFetchItems(pagination);
        setIsMounted(true);

        setFilterData(null);
      }
    };
    fetchFilter();
  }, [searchTerm]);

  useEffect(() => {
    if (!isLoading && isMounted) setFilterData(data);
    return () => {
      setIsMounted(false);
    };
  }, [isLoading]);
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
