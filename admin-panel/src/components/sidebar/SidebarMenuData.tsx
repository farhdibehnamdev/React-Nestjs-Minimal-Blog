import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { SidebarProps } from "./SidebarProps";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import SendIcon from "@mui/icons-material/Send";
const menuData: SidebarProps[] = [
  {
    id: 1,
    path: "/",
    menuTitle: "داشبورد",
    menuIconMUI: <DashboardOutlinedIcon />,
    children: null,
  },
  {
    id: 2,
    path: "/posts",
    menuTitle: "پست ها",
    menuIconMUI: <FormatListBulletedOutlinedIcon />,
    children: null,
  },
  {
    id: 3,
    path: "/categories",
    menuTitle: "فهرست ها",
    menuIconMUI: <FeaturedPlayListOutlinedIcon />,
    children: null,
  },
  {
    id: 4,
    path: "/tags",
    menuTitle: "تگ ها",
    menuIconMUI: <LocalOfferOutlinedIcon />,
    children: null,
  },
  {
    id: 5,
    path: "/send-message",
    menuTitle: "ارسال پیام",
    menuIconMUI: <EmailOutlinedIcon />,
    children: [
      {
        id: 1,
        path: "/sent-messages",
        menuTitle: "پیام های ارسال شده",
        menuIconMUI: <EmailOutlinedIcon />,
        children: <SendIcon />,
      },
      {
        id: 2,
        path: "/received-messages",
        menuTitle: "پیام های دریافت شده",
        menuIconMUI: <EmailOutlinedIcon />,
        children: <MarkEmailReadIcon />,
      },
    ],
  },
  {
    id: 6,
    path: "/user-management",
    menuTitle: "مدیریت کاربران",
    menuIconMUI: <ManageAccountsOutlinedIcon />,
    children: null,
  },
  {
    id: 7,
    path: "/sign-out",
    menuTitle: "خروج",
    menuIconMUI: <LogoutIcon />,
    children: null,
  },
];

export default menuData;
