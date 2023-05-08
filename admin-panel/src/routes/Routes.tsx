import AuthLayout from "src/components/authLayout/AuthLayout";
import AddCategory from "src/components/categories/AddCategory";
import Categories from "src/components/categories/Categories";
import CategoriesLayout from "src/components/categories/CategoriesLayout";
import EditCategory from "src/components/categories/EditCategory";
import Dashboard from "src/components/dashboard/Dashboard";
import DashboardLayout from "src/components/dashboardLayout/DashboardLayout";
import Home from "src/components/home/Home";
import AddPost from "src/components/posts/AddPost";
import EditPost from "src/components/posts/EditPost";
import Posts from "src/components/posts/Posts";
import PostsLayout from "src/components/posts/PostsLayout";
import Profile from "src/components/profile/Profile";
import ResetPassword from "src/components/resetPassword/ResetPassword";
import SendMessage from "src/components/sendMessage/SendMessage";
import Settings from "src/components/settings/Settings";
import SignOut from "src/components/signout/SignOut";
import SignUp from "src/components/signup/SignUp";
import AddTag from "src/components/tags/AddTag";
import EditTag from "src/components/tags/EditTag";
import Tags from "src/components/tags/Tags";
import TagsLayout from "src/components/tags/TagsLayout";
import UserManagement from "src/components/userManagement/UserManagement";
import { VerifiedEmail } from "src/components/verifiedEmail/VerifiedEmail";
import { VerifyEmail } from "src/components/verifyEmail/VerifyEmail";

const routeArrays = [
  {
    element: <DashboardLayout />,
    children: [
      {
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "posts",
            element: <PostsLayout />,
            children: [
              {
                index: true,
                element: <Posts />,
              },
              { path: "add", element: <AddPost /> },
              { path: "edit/:id", element: <EditPost /> },
            ],
          },
          {
            path: "categories",
            element: <CategoriesLayout />,
            children: [
              {
                index: true,
                element: <Categories />,
              },
              {
                path: "add",
                element: <AddCategory />,
              },
              {
                path: "edit/:id",
                element: <EditCategory />,
              },
            ],
          },
          {
            path: "tags",
            element: <TagsLayout />,
            children: [
              {
                index: true,
                element: <Tags />,
              },
              {
                path: "add",
                element: <AddTag />,
              },
              {
                path: "edit/:id",
                element: <EditTag />,
              },
            ],
          },
          {
            path: "send-message",
            element: <SendMessage />,
          },
          {
            path: "user-management",
            element: <UserManagement />,
          },
          {
            path: "sign-out",
            element: <SignOut />,
          },
        ],
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "verified",
        element: <VerifiedEmail />,
      },
    ],
  },
];
export default routeArrays;
