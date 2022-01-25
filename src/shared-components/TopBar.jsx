import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

const TopBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          My Notes
        </Typography>
        <AccountCircle />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
