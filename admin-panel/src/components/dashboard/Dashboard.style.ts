import { SxProps } from "@mui/material";

const mainStyleGrid: SxProps = {
  width: "calc(100% - 240px)",
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
