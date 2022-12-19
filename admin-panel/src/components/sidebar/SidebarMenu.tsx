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
import { Tooltip, useMediaQuery, useTheme } from "@mui/material";
const data: SidebarProps[] = [
  { id: 1, menuTitle: "داشبورد", menuIconMUI: <DashboardOutlinedIcon /> },
  {
    id: 2,
    menuTitle: "پست ها",
    menuIconMUI: <FormatListBulletedOutlinedIcon />,
  },
  { id: 3, menuTitle: "تگ ها", menuIconMUI: <LocalOfferOutlinedIcon /> },
  { id: 4, menuTitle: "ارسال پیام", menuIconMUI: <EmailOutlinedIcon /> },
  {
    id: 5,
    menuTitle: "مدیریت کاربران",
    menuIconMUI: <ManageAccountsOutlinedIcon />,
  },
  { id: 6, menuTitle: "خروج", menuIconMUI: <LogoutIcon /> },
];

export const MenuList = function ({ toggle }: MenuListProps): JSX.Element {
  const theme = useTheme();
  const [activeMenu, setActiveMenu] = React.useState<any>({});
  const mediaQ = useMediaQuery(theme.breakpoints.up("lg"));
  // const activeMenu = activeClass ? "activeMenu" : "";
  const handleToggleMenu = function (id: any) {
    setActiveMenu((state: any) => ({
      [id]: !activeMenu[id],
    }));
  };

  return (
    <React.Fragment>
      {data.map((item, index) => {
        return (
          <Tooltip
            title={!toggle && mediaQ ? item.menuTitle : ""}
            placement="right-start"
            key={item.id}
          >
            <ListItemButton
              className={`listStyleItemButton ${
                activeMenu[item.id] ? "menuSelected" : ""
              }`}
              onClick={() => handleToggleMenu(item.id)}
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
                className="menuName"
                primary={item.menuTitle}
                sx={{ opacity: toggle ? 1 : 0 }}
              />
            </ListItemButton>
          </Tooltip>
        );
      })}
    </React.Fragment>
  );
};
