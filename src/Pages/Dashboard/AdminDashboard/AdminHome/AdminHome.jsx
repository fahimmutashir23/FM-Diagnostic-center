import { Box, Paper, Typography } from "@mui/material";
import useAuth from "../../../../Hooks/useAuth";
import Lottie from "../../../../Utils/Lottie/Lottie";
import bg from '../../../../assets/image/medical-bg.jpg'

const AdminHome = () => {
  const { user } = useAuth();
  return (
    <Box
      component={Paper}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography variant="h4" sx={{}}>
          Hey!
          <Typography sx={{fontSize: '3rem'}} fontWeight="bold" variant="h3">
            {user.displayName}
          </Typography>
        </Typography>
        <Lottie></Lottie>
      </Box>
    </Box>
  );
};

export default AdminHome;
