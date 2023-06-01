import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { SidebarProps } from "./SidebarProps";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
const menuData: SidebarProps[] = [
  {
    id: 1,
    path: "/",
    menuTitle: "داشبورد",
    menuIconMUI: <DashboardOutlinedIcon />,
    submenu: [],
  },
  {
    id: 2,
    path: "/posts",
    menuTitle: "پست ها",
    menuIconMUI: <FormatListBulletedOutlinedIcon />,
    submenu: [],
  },
  {
    id: 3,
    path: "/categories",
    menuTitle: "فهرست ها",
    menuIconMUI: <FeaturedPlayListOutlinedIcon />,
    submenu: [],
  },
  {
    id: 4,
    path: "/tags",
    menuTitle: "تگ ها",
    menuIconMUI: <LocalOfferOutlinedIcon />,
    submenu: [],
  },
  {
    id: 5,
    path: "#",
    menuTitle: "پیام ها",
    menuIconMUI: <EmailOutlinedIcon />,
    submenu: [
      {
        id: 51,
        path: "/send-message",
        menuTitle: "ارسال پیام",
        menuIconMUI: <SendIcon />,
      },
      {
        id: 52,
        path: "/sent-messages",
        menuTitle: "پیام های ارسال شده",
        menuIconMUI: <DraftsIcon />,
      },
      {
        id: 53,
        path: "/received-messages",
        menuTitle: "پیام های دریافت شده",
        menuIconMUI: <InboxIcon />,
      },
    ],
  },
  {
    id: 6,
    path: "/user-management",
    menuTitle: "مدیریت کاربران",
    menuIconMUI: <ManageAccountsOutlinedIcon />,
    submenu: [],
  },
  {
    id: 7,
    path: "/sign-out",
    menuTitle: "خروج",
    menuIconMUI: <LogoutIcon />,
    submenu: [],
  },
];

export default menuData;
