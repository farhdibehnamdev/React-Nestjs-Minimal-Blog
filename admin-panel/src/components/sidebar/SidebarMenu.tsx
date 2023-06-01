import React, { useCallback, useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MenuListProps, SidebarProps } from "./SidebarProps";
import {
  Collapse,
  List,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import menuData from "./SidebarMenuData";
import { Link } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export const MenuList = function ({ toggle }: MenuListProps): JSX.Element {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleClick = function () {
    setOpen(!open);
  };
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
                onClick={() => {
                  handleToggleMenu(item.id);
                  handleClick();
                }}
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
                {item.submenu?.length! > 0 ? (
                  open ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </ListItemButton>
              {item.submenu && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.submenu.map((child: SidebarProps) => {
                      return (
                        <Link
                          className="navText"
                          to={child.path}
                          key={child.id}
                        >
                          <ListItemButton
                            sx={{ pl: 6 }}
                            className={`listStyleItemButton ${
                              activeMenu[child.id] ? "menuSelected" : ""
                            }`}
                            onClick={() => handleToggleMenu(child.id)}
                          >
                            <ListItemIcon
                              sx={{
                                mr: toggle ? -2 : "auto",
                              }}
                            >
                              {child.menuIconMUI}
                            </ListItemIcon>
                            <ListItemText
                              primary={child.menuTitle}
                              sx={{ opacity: toggle ? 1 : 0 }}
                            />
                          </ListItemButton>
                        </Link>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </Link>
          </Tooltip>
        );
      })}
    </React.Fragment>
  );
};
