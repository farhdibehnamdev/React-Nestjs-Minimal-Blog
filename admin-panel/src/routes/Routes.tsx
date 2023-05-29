import { Route, Routes } from "react-router-dom";
import AuthLayout from "src/components/authLayout/AuthLayout";
import AddCategory from "src/components/categories/AddCategory";
import Categories from "src/components/categories/Categories";
import CategoriesLayout from "src/components/categories/CategoriesLayout";
import EditCategory from "src/components/categories/EditCategory";
import DashboardLayout from "src/components/dashboardLayout/DashboardLayout";
import Home from "src/components/home/Home";
import AddPost from "src/components/posts/AddPost";
import EditPost from "src/components/posts/EditPost";
import Posts from "src/components/posts/Posts";
import PostsLayout from "src/components/posts/PostsLayout";
import Profile from "src/components/profile/Profile";
import ProtectedRoute, {
  PublicRoute,
} from "src/components/protectedRoute/ProtectedRoute";
import ResetPassword from "src/components/resetPassword/ResetPassword";
import SendMessage from "src/components/sendMessage/SendMessage";
import SignIn from "src/components/signin/SignIn";
import SignUp from "src/components/signup/SignUp";
import AddTag from "src/components/tags/AddTag";
import EditTag from "src/components/tags/EditTag";
import Tags from "src/components/tags/Tags";
import TagsLayout from "src/components/tags/TagsLayout";
import Unauthorized from "src/components/unauthorized/Unauthorized";
import AddUser from "src/components/userManagement/AddUser";
import { EditUser } from "src/components/userManagement/EditUser";
import UserManagement from "src/components/userManagement/UserManagement";
import UserManagementLayout from "src/components/userManagement/UserManagementLayout";
import { VerifiedEmail } from "src/components/verifiedEmail/VerifiedEmail";
import { VerifyEmail } from "src/components/verifyEmail/VerifyEmail";

export const RouteApp = function () {
  return (
    <Routes>
      {/* Public Ruote */}
      <Route path="auth" element={<AuthLayout />}>
        <Route element={<PublicRoute />}>
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="sign-in" element={<SignIn />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="forget-password" element={<ResetPassword />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="verify-email" element={<VerifyEmail />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="verified" element={<VerifiedEmail />} />
        </Route>

        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
      {/* Protected Route */}
      <Route path="/" element={<ProtectedRoute roles={["admin", "user"]} />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="posts" element={<PostsLayout />}>
            <Route index element={<Posts />} />
            <Route path="add" element={<AddPost />} />
            <Route path="edit/:id" element={<EditPost />} />
          </Route>
          <Route path="categories" element={<CategoriesLayout />}>
            <Route index element={<Categories />} />
            <Route path="add" element={<AddCategory />} />
            <Route path="edit/:id" element={<EditCategory />} />
          </Route>
          <Route path="tags" element={<TagsLayout />}>
            <Route index element={<Tags />} />
            <Route path="add" element={<AddTag />} />
            <Route path="edit/:id" element={<EditTag />} />
          </Route>
          <Route path="send-message" element={<SendMessage />} />
          <Route element={<ProtectedRoute roles={["admin", "user"]} />}>
            <Route path="user-management" element={<UserManagementLayout />}>
              <Route index element={<UserManagement />} />
              <Route path="add" element={<AddUser />} />
              <Route path="edit/:id" element={<EditUser />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
