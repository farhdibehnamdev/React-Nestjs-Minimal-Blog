import React from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import paperCardStyle from "./Card.style";
import { CardProps } from "./CardProps";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box className="boxCardContainerStyle">
      <Box>
        <LinearProgress
          variant="determinate"
          {...props}
          className="linearProgressStyle"
        />
      </Box>
    </Box>
  );
}
const Card = function ({ title, counts }: CardProps) {
  const [progress, setProgress] = React.useState(10);
  return (
    <Paper variant="outlined" square sx={paperCardStyle}>
      <Stack flexDirection="column" className="stackColumnPaperStyle">
        <Stack flexDirection="row" className="stackRowPaperStyle">
          <Typography className="typographyContentPaperStyle">
            {title}
          </Typography>
          <Typography className="typographyContentPaperStyle">
            {counts}
          </Typography>
        </Stack>
        <LinearProgressWithLabel value={progress} />
        <Stack flexDirection="row" justifyContent="space-around">
          <Typography className="typographyContentPaperStyle">-1.2%</Typography>
          <Typography>از دیروز</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Card;
