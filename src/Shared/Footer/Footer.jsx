import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Logo from "../../Utils/Logo/Logo";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <BottomNavigation
      sx={{
        backgroundColor: "#6b7cff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        height: '150px'
      }}
    >
      <Box sx={{ width: "100px" }}>
        <Logo></Logo>
      </Box>
      <Box>
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          label="Folder"
          value="folder"
          icon={<FolderIcon />}
        />
      </Box>
      <Typography>Copyright © 2023 - All right reserved</Typography>
    </BottomNavigation>
  );
};

export default Footer;
