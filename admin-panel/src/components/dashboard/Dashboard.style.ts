import { Grid, SxProps, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";

interface DashboardGridStyledProps {
  open?: boolean;
}
export const DashboardGridStyled = styled(Grid)<DashboardGridStyledProps>(
  ({ theme, open }) => ({
    [theme.breakpoints.up("lg")]: {
      ...(open && {
        width: "calc(100% - 240px)",
      }),
      ...(!open && {
        width: "100%",
      }),
    },
  })
);

const mainStyleGrid: SxProps<Theme> = {
  marginLeft: "auto",
  // background: "rebeccapurple",
  ".mainContent": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
