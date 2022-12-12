import Layout from "./components/layout/Layout";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, Grid, ThemeProvider } from "@mui/material";
import theme from "./globalStyles/theme";
const cacheRTL = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <Grid>
      <CacheProvider value={cacheRTL}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout />
        </ThemeProvider>
      </CacheProvider>
    </Grid>
  );
}

export default App;
