import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MenuListProps } from "./SidebarProps";
import { Tooltip, useMediaQuery, useTheme } from "@mui/material";
import menuData from "./SidebarMenuData";
import { Link } from "react-router-dom";

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
      {menuData.map((item, index) => {
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
                primary={
                  <Link className="navText" to={item.path}>
                    {item.menuTitle}
                  </Link>
                }
                sx={{ opacity: toggle ? 1 : 0 }}
              />
            </ListItemButton>
          </Tooltip>
        );
      })}
    </React.Fragment>
  );
};
