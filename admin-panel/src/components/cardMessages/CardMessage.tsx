import {
  Box,
  CardMedia,
  Typography,
  List,
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import React from "react";
import CardMessageStyled from "./CardMessage.style";

const CardMessage = function ({ toggleOpenMessage, settings }: any) {
  console.log("toggleOpenMessage CardMessage :::", toggleOpenMessage);
  console.log("settings :", settings.cardType);
  const [checked, setChecked] = React.useState([2]);
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <CardMessageStyled isOpen={toggleOpenMessage} cardType={settings.cardType}>
      <CardMedia
        component="div"
        className="boxImageHeaderMessageStyle"
        children={
          <Box className="boxMessageInCardMediaStyle">
            <Typography component="h6" className="typoH6MessageCardMediaStyle">
              {settings.cardHeaderText.title}
            </Typography>
            <Typography component="small">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                }}
                className="typoSmallCardMediaStyle"
              >
                <Typography>{settings.cardHeaderText.counts}</Typography>
                <Typography>
                  {settings.cardHeaderText.underTitleText}
                </Typography>
              </Box>
            </Typography>
          </Box>
        }
      />
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem
              key={value}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value)}
                  checked={checked.indexOf(value) !== -1}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value + 1}`}
                    src={`/static/images/avatar/${value + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </CardMessageStyled>
  );
};
export default CardMessage;
