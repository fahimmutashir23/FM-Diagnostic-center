import { Box, Typography } from "@mui/material";
import Lottie from "../../../../Utils/Lottie/Lottie";
import useAuth from "../../../../Hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth()
    return (
        <Box sx={{display: 'flex'}}>
      <Typography variant="h4" sx={{}}>
        Hello! <br />{" "}
        <Typography fontWeight="bold" variant="h3">
          {user.displayName}
        </Typography>
      </Typography>
      <Lottie></Lottie>
    </Box>
    );
};

export default UserHome;