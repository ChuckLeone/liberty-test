import React from "react";
import { Grid, Divider, Typography } from "@mui/material";
const Footer = () => {
  const getDate = () => {
    return new Date().getFullYear();
  };
  return (
    <Grid
      container
      spacing={2}
      sx={{ marginTop: "20px", marginBottom: "20px" }}
    >
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption" sx={{ color: "#a7a7a7" }}>
          Copyright © {getDate()} Libery Lending
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
