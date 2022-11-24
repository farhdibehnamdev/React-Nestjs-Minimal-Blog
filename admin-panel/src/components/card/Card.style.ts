import { SxProps } from "@mui/material";

const paperCardStyle: SxProps = {
  background: "#fff",
  borderRadius: "10px",
  border: "none",
  flex: "1 1 auto",
  ".boxCardContainerStyle": {
    alignItems: "center",
    paddingRight: "15px",
    paddingLeft: "15px",
    ".linearProgressStyle": {
      borderRadius: "20px",
    },
  },
  ".stackColumnPaperStyle": {
    gap: "30px",
    padding: "20px",
    ".stackColumnPaperStyle": {
      justifyContent: "space-around",
      alignItems: "center",
      ".typographyContentPaperStyle": {
        fontSize: "20px",
      },
    },
  },
};

export default paperCardStyle;
