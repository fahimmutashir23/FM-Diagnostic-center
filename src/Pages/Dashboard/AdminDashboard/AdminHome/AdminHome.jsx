import { Box, Typography } from "@mui/material";
import useAuth from "../../../../Hooks/useAuth";
import Lottie from "../../../../Utils/Lottie/Lottie";


const AdminHome = () => {
  const { user } = useAuth();
  return (
    <Box component={"div"}
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}>
      <Box sx={{display: 'flex'}}>
      <Typography variant="h4" sx={{}}>
        Hello! <br />{" "}
        <Typography fontWeight="bold" variant="h3">
          {user.displayName}
        </Typography>
      </Typography>
      <Lottie></Lottie>
    </Box>
    </Box>
  );
};

export default AdminHome;
