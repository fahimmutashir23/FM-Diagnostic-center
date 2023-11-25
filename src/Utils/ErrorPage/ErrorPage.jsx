import { Box, Button, } from "@mui/material";
import error from "../../assets/image/404.gif";
import { Link } from "react-router-dom";
import { NavigateBefore } from "@mui/icons-material";

const ErrorPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box>
        <img src={error} alt="" style={{ width: "600px" }} />
        <Link to='/'>
          <Button startIcon={<NavigateBefore/>}>Back to Home</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ErrorPage;
