import { Grid, SxProps, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
export const DashboardGridStyled = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    width: "calc(100% - 240px)",
  },
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));

const mainStyleGrid: SxProps<Theme> = {
  marginLeft: "auto",
  background: "rebeccapurple",
  ".mainContent": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },

  ".stackStyleWrapperCards": {
    gap: "10px",
    marginBottom: "10px",
    display: "flex",
    flexWrap: "wrap",
  },
  ".cardStyle": {
    flex: "1 1 auto",
  },
};

export default mainStyleGrid;
