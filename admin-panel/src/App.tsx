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
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Settings from "./components/settings/Settings";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Tags from "./components/tags/Tags";
import SendMessage from "./components/sendMessage/SendMessage";
import UserManagement from "./components/userManagement/UserManagement";
import SignOut from "./components/signout/SignOut";
import AuthLayout from "./components/authLayout/AuthLayout";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import Home from "./components/home/Home";
import Categories from "./components/categories/Categories";
import AddPost from "./components/posts/AddPost";
import PostsLayout from "./components/posts/PostsLayout";
import EditPost from "./components/posts/EditPost";
import AddCategory from "./components/categories/AddCategory";
import EditCategory from "./components/categories/EditCategory";
import CategoriesLayout from "./components/categories/CategoriesLayout";
import TagsLayout from "./components/tags/TagsLayout";
import AddTag from "./components/tags/AddTag";
import EditTag from "./components/tags/EditTag";
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
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />}>
                <Route index element={<Home />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<Profile />} />
                <Route path="posts" element={<PostsLayout />}>
                  <Route index element={<Posts />} />
                  <Route path="add" element={<AddPost />} />
                  <Route path="edit" element={<EditPost />} />
                </Route>
                <Route path="categories" element={<CategoriesLayout />}>
                  <Route index element={<Categories />} />
                  <Route path="add" element={<AddCategory />} />
                  <Route path="edit" element={<EditCategory />} />
                </Route>
                <Route path="tags" element={<TagsLayout />}>
                  <Route index element={<Tags />} />
                  <Route path="add" element={<AddTag />} />
                  <Route path="edit" element={<EditTag />} />
                </Route>
                <Route path="send-message" element={<SendMessage />} />
                <Route path="user-management" element={<UserManagement />} />
                <Route path="sign-out" element={<SignOut />} />
              </Route>
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
          </Routes>
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
