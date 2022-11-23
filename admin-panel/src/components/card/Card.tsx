import React from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

type CardProps = {
  title?: string;
  counts?: number;
};

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        paddingRight: "15px",
        paddingLeft: "15px",
      }}
    >
      <Box sx={{ width: "100%", mr: 1, borderRadius: "20px" }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{ borderRadius: "20px" }}
        />
      </Box>
    </Box>
  );
}
const Card = function ({ title, counts }: CardProps) {
  const [progress, setProgress] = React.useState(10);
  return (
    <Paper
      variant="outlined"
      square
      sx={{
        height: "150px",
        width: "350px",
        background: "#fff",
        borderRadius: "10px",
        border: "none",
      }}
    >
      <Stack flexDirection="column" sx={{ gap: "30px", padding: "20px" }}>
        <Stack
          flexDirection="row"
          sx={{
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "20px" }}>{title}</Typography>
          <Typography sx={{ fontSize: "20px" }}>{counts}</Typography>
        </Stack>
        <LinearProgressWithLabel value={progress} />
        <Stack flexDirection="row" justifyContent="space-around">
          <Typography sx={{ fontSize: "20px" }}>-1.2%</Typography>
          <Typography>از دیروز</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Card;
