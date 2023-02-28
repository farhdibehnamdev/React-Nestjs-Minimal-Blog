import React, { useCallback } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MenuListProps } from "./SidebarProps";
import { Tooltip, useMediaQuery, useTheme } from "@mui/material";
import menuData from "./SidebarMenuData";
import { Link } from "react-router-dom";

export const MenuList = function ({ toggle }: MenuListProps): JSX.Element {
  const theme = useTheme();
  const mediaQ = useMediaQuery(theme.breakpoints.up("lg"));
  const [activeMenu, setActiveMenu] = React.useState<any>({});
  const handleToggleMenu = useCallback((id: any) => {
    setActiveMenu({
      ...activeMenu,
      [id]: !activeMenu[id],
    });
  }, []);

  return (
    <React.Fragment>
      {menuData.map((item, index) => {
        return (
          <Tooltip
            title={!toggle && mediaQ ? item.menuTitle : ""}
            placement="right-start"
            key={item.id}
          >
            <Link className="navText" to={item.path}>
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
            </Link>
          </Tooltip>
        );
      })}
    </React.Fragment>
  );
};
