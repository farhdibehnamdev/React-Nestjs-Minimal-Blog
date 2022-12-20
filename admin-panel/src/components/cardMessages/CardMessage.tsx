import React from "react";
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
  CheckboxProps,
  styled,
} from "@mui/material";
import CardMessageStyled from "./CardMessage.style";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  marginBottom: "15px",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  // backgroundColor: "#137cbd",
  backgroundColor: "#004deb",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    // backgroundColor: "#106ba3",
    backgroundColor: "#407bf0",
  },
});

// Inspired by blueprintjs
function BpCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      sx={{
        "&:hover": { bgcolor: "transparent" },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
}

const CardMessage = function ({ toggleMessageOpen, settings }: any) {
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
    <CardMessageStyled isOpen={toggleMessageOpen}>
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
        sx={{
          padding: "20px 10px 20px 10px",
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem
              key={value}
              secondaryAction={
                <BpCheckbox
                  edge="end"
                  onChange={handleToggle(value)}
                  checked={checked.indexOf(value) !== -1}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar sx={{ minWidth: "40px" }}>
                  <Avatar
                    sx={{ width: "30px", height: "30px", marginBottom: "15px" }}
                    alt={`Avatar n°${value + 1}`}
                    src={`/static/images/avatar/${value + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={`Line item ${value + 1}`}
                  secondary={
                    <Typography sx={{ fontSize: "11px", color: "#a7abc3" }}>
                      02:30 ب.ظ
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </CardMessageStyled>
  );
};
export default CardMessage;
