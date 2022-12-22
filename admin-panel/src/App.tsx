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
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "./features/toggle/toggleSlice";
import theme from "./globalStyles/theme";
import DashboardLayout from "./components/dashboardLayout/DashboardLayout";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Settings from "./components/settings/Settings";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Tags from "./components/tags/Tags";
import SendMessage from "./components/sendMessage/SendMessage";
import UserManagement from "./components/userManagement/UserManagement";
import Exit from "./components/exit/Exit";
const cacheRTL = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  const { toggle } = useSelector((state: any) => state.toggle);
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
          <Router>
            <Routes>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Dashboard />}>
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/tags" element={<Tags />} />
                  <Route path="/send-message" element={<SendMessage />} />
                  <Route path="/user-management" element={<UserManagement />} />
                  <Route path="/exit" element={<Exit />} />
                </Route>
              </Route>
            </Routes>
          </Router>
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
