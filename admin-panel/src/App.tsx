import React from "react";
import Layout from "./components/layout/Layout";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, Grid, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  toggleMessage,
  toggleNotification,
} from "./features/toggle/toggleSlice";
const cacheRTL = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <div style={{ width: "100%" }}>
      <CacheProvider value={cacheRTL}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout />
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}

export default App;
