import BottomNavigation from "@mui/material/BottomNavigation";
import Logo from "../../Utils/Logo/Logo";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <BottomNavigation
      sx={{
        backgroundColor: "#6b7cff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "250px",
      }}
    >
          <Box sx={{ width: "150px" }}>
            <Logo></Logo>
          </Box>
      <Grid container spacing={2} sx={{display: 'flex', alignItems: 'center'}}>
        <Grid item sm={12} md={6} sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: "1.2rem", fontWeight: 'bold' }}>Social Link:</Typography>
          <IconButton size="large">
            <Facebook color="inherit" fontSize="inherit"></Facebook>
          </IconButton>
          <IconButton size="large">
            <LinkedIn color="inherit" fontSize="inherit"></LinkedIn>
          </IconButton>
          <IconButton size="large">
            <Instagram color="inherit" fontSize="inherit"></Instagram>
          </IconButton>
        </Grid>
        
        <Grid item sm={12} md={6} sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: "1.2rem", fontWeight: 'bold' }}>Address:</Typography>
          <Typography sx={{}}>
            FM Diagnostic Center, Dhanmondi, <br /> Dhaka-1205
          </Typography>
          <Typography sx={{}}>
            +880 1581 868984
          </Typography>
        </Grid>
      </Grid>
      <Typography>Copyright © 2023 - All right reserved</Typography>
    </BottomNavigation>
  );
};

export default Footer;
