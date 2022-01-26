import React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

const TopBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <Typography variant="h6" component="div">
            Note App
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <AccountCircle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
