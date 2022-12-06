import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { CardMessageStyle } from "./Messages.style";

const Message = function ({ toggleMessage }: any) {
  return (
    <Box sx={{ display: toggleMessage ? "block" : "none" }}>
      <Card sx={CardMessageStyle}>
        <CardMedia
          component="div"
          className="boxImageHeaderMessageStyle"
          children={
            <Box className="boxMessageInCardMediaStyle">
              <Typography
                component="h6"
                className="typoH6MessageCardMediaStyle"
              >
                پیام ها
              </Typography>
              <Typography component="small" className="typoSmallCardMediaStyle">
                2 پیام خوانده نشده
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Message;
