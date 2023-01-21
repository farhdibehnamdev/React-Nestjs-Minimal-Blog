import { Typography } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { Pagination } from "@mui/material";
import { Grid } from "@mui/material";
import { useState } from "react";

const TablePagination = function () {
  const [pageCount, setPageCount] = useState<string>("5");

  const handleChange = (event: SelectChangeEvent) => {
    setPageCount(event.target.value);
  };
  return (
    <Grid container justifyContent="space-between">
      <Grid item xl={6} justifyContent="center">
        <Pagination
          count={10}
          variant="outlined"
          color="primary"
          shape="rounded"
        />
      </Grid>
      <Grid item xl={3}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xl={2}>
            <Typography>نمایش</Typography>
          </Grid>
          <Grid item xl={2}>
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
          </Grid>
          <Typography>رکورد</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TablePagination;
