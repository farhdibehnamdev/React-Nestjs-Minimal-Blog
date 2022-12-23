import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { SidebarProps } from "./SidebarProps";

const menuData: SidebarProps[] = [
  {
    id: 1,
    path: "/",
    menuTitle: "داشبورد",
    menuIconMUI: <DashboardOutlinedIcon />,
  },
  {
    id: 2,
    path: "/posts",
    menuTitle: "پست ها",
    menuIconMUI: <FormatListBulletedOutlinedIcon />,
  },
  {
    id: 3,
    path: "/tags",
    menuTitle: "تگ ها",
    menuIconMUI: <LocalOfferOutlinedIcon />,
  },
  {
    id: 4,
    path: "/send-message",
    menuTitle: "ارسال پیام",
    menuIconMUI: <EmailOutlinedIcon />,
  },
  {
    id: 5,
    path: "/user-management",
    menuTitle: "مدیریت کاربران",
    menuIconMUI: <ManageAccountsOutlinedIcon />,
  },
  { id: 6, path: "/sign-out", menuTitle: "خروج", menuIconMUI: <LogoutIcon /> },
];

export default menuData;
