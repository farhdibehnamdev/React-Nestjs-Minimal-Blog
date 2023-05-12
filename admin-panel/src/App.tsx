import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import {
  Backdrop,
  CssBaseline,
  Grid,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "./store/slices/toggle/toggleSlice";
import theme from "./globalStyles/theme";
import { RouteApp } from "./routes/Routes";
import { useAppSelector } from "./store/hooks";
const cacheRTL = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  const { toggle } = useAppSelector((state: any) => state.toggle);
  const dispatch = useDispatch();
  const mediaQ = useMediaQuery(theme.breakpoints.down("lg"));
  const handleClose = () => {
    dispatch(toggleSidebar(false));
  };

  return (
    <Grid>
      <CacheProvider value={cacheRTL}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouteApp />
          {mediaQ && (
            <Backdrop
              sx={{
                color: "#b8afaf",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={toggle}
              onClick={handleClose}
            ></Backdrop>
          )}
        </ThemeProvider>
      </CacheProvider>
    </Grid>
  );
}

export default App;
