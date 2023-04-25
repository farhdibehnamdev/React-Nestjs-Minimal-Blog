import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { Avatar, Divider, Stack, Tooltip } from "@mui/material";
import sidebarStyle, {
  Drawer,
  DrawerHeader,
  StyledBadge,
} from "./Sidebar.style";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useSelector } from "react-redux";
import { BoxRootSidebarStyled } from "./Sidebar.style";
import { MenuList } from "./SidebarMenu";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { toggle } = useSelector((state: any) => state.toggle);

  return (
    <BoxRootSidebarStyled open={toggle}>
      <Drawer
        variant="permanent"
        ModalProps={{ keepMounted: true }}
        open={toggle}
        sx={sidebarStyle}
      >
        <DrawerHeader open={toggle} className="logoHide">
          <img src="/assets/images/logo.png" alt="logo" />
        </DrawerHeader>
        <Box className="boxProfileSidebar">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              className="avatar"
              alt="Remy Sharp"
              src="/assets/images/avatar.jpg"
            />
          </StyledBadge>
          <Box className="boxUserInfoStyle">
            <Typography className="typographyName" component="h5">
              بهنام فرهادی
            </Typography>
            <Typography component="span" className="typographyUserRoleSpan">
              مدیر
            </Typography>
            <Stack direction="row" spacing={2}>
              <Tooltip
                className="tooltipButtonsStyle"
                title="پروفایل"
                placement="top"
              >
                <Link to="/profile">
                  <IconButton
                    className="profileStyleIconButton personIconButton"
                    size="small"
                  >
                    <Person2OutlinedIcon fontSize="inherit" />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip title="تنظیمات" placement="top">
                <IconButton
                  className="profileStyleIconButton settingIconButton"
                  size="small"
                >
                  <SettingsOutlinedIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
              <Tooltip title="خروج" placement="top">
                <IconButton
                  className="profileStyleIconButton exitIconButton"
                  size="small"
                >
                  <LogoutIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
        </Box>
        <Divider className="dividerProfileStyle" />
        <List className="menuList">
          <ListItem disablePadding sx={{ display: "block" }}>
            <MenuList toggle={toggle} />
          </ListItem>
        </List>
      </Drawer>
    </BoxRootSidebarStyled>
  );
}
