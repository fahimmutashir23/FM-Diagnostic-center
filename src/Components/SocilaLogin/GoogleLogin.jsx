import GoogleIcon from '@mui/icons-material/Google';
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic()

  const handleGoogleSignIn = () => {
    googleSignIn().then((res) => {
      Swal.fire(
        "Log In successful",
        "Thank you to login our website",
        "success"
      ) 
        axiosPublic.post('/users', )
        .then(res => {
            console.log(res.data);
        })
      navigate(location?.state ? location.state : "/");
    });
  };

  return (
    <Stack
     direction="row" spacing={2}>
      <Button onClick={handleGoogleSignIn} variant="outlined" startIcon={<GoogleIcon />}>
        Login
      </Button>
    </Stack>
  );
};

export default GoogleLogin;
