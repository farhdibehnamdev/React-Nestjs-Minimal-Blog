import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { MenuListProps, SidebarProps } from "./SidebarProps";
const data: SidebarProps[] = [
  { menuTitle: "داشبورد", menuIconMUI: <DashboardOutlinedIcon /> },
  { menuTitle: "پست ها", menuIconMUI: <FormatListBulletedOutlinedIcon /> },
  { menuTitle: "تگ ها", menuIconMUI: <LocalOfferOutlinedIcon /> },
  { menuTitle: "ارسال پیام", menuIconMUI: <EmailOutlinedIcon /> },
  {
    menuTitle: "مدیریت کاربران",
    menuIconMUI: <ManageAccountsOutlinedIcon />,
  },
  { menuTitle: "خروج", menuIconMUI: <LogoutIcon /> },
];
export const MenuList = function ({ toggle }: MenuListProps): JSX.Element {
  return (
    <React.Fragment>
      {data.map((item) => {
        return (
          <ListItemButton
            className="listStyleItemButton"
            sx={{
              justifyContent: toggle ? "initial" : "center",
            }}
          >
            <ListItemIcon
              className="listStyleItemIcon"
              sx={{
                mr: toggle ? 3 : "auto",
              }}
            >
              {item.menuIconMUI}
            </ListItemIcon>
            <ListItemText
              primary={item.menuTitle}
              sx={{ opacity: toggle ? 1 : 0 }}
            />
          </ListItemButton>
        );
      })}
    </React.Fragment>
  );
};
