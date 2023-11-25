import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Utils/Loading/Loading";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_API_KEY
}`;

const Registration = () => {
  const [blood, setBlood] = useState("A+");
  const [districtData, setDistrictData] = useState([]);
  const [district, setDistrict] = useState("Dhaka");
  const [upozila, setUpozila] = useState("");
  const [upozilaData, setUpozilaData] = useState([])
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { signUpUser, logOutUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleBloodChange = (event) => {
    setBlood(event.target.value);
  };
  const handleDistrictChange = async (event) => {
    setDistrict(event.target.value);

    const res = await axiosPublic(`/upozila?district_id=${event.target.value.id}`)
    setUpozilaData(res.data)
  };
  const handleUpozilaChange = (event) => {
    setUpozila(event.target.value);
  };

  useEffect(() => {
    fetch("/district.json")
      .then((res) => res.json())
      .then((data) => setDistrictData(data));
  }, []);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const district = e.target.district.value;
    const upozila = e.target.upozila.value;
    const blood = e.target.blood.value;
    const photo = e.target.photo.files[0];
    const password = e.target.password.value;
    const confirm_password = e.target.confirm_password.value;
    

    if (password !== confirm_password) {
      setLoading(false);
      return setErrorMsg("Password not matched");
    }

    const imgFile = { image: photo };
    const res = await axiosPublic.post(imgUploadUrl, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.data.display_url) {

      signUpUser(email, password).then((result) => {
        if (result.user) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Your Registration has successful",
            showConfirmButton: false,
            timer: 1500,
          });
          updateUser({
            displayName: name,
            photoURL: res.data.data.display_url,
          });
          const userInfo = {
            name : name,
            email: email,
            district : district,
            upozila : upozila,
            blood : blood,
            profileImage : res.data.data.display_url
          };
          
          axiosPublic.post('/users', userInfo)
          .then(() => { })

          logOutUser() && navigate("/login");
          e.target.reset();
        }
      });
    } else {
      return setLoading(true);
    }
    setLoading(false);
  };

  return (
    <Grid item component={Paper} elevation={3} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          py: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" sx={{ fontWeight: "bold" }}>
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Your Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
          <Select
            fullWidth
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={blood}
            name="blood"
            onChange={handleBloodChange}
          >
            <MenuItem value="A+">A+</MenuItem>
            <MenuItem value="A-">A-</MenuItem>
            <MenuItem value="B+">B+</MenuItem>
            <MenuItem value="B-">B-</MenuItem>
            <MenuItem value="AB+">AB+</MenuItem>
            <MenuItem value="AB-">AB-</MenuItem>
            <MenuItem value="O+">O+</MenuItem>
            <MenuItem value="O-">O-</MenuItem>
          </Select>
          <InputLabel sx={{ mt: "20px" }} id="demo-simple-select-label">
            Select District
          </InputLabel>
          <Select
            fullWidth
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={district.name}
            name="district"
            onChange={handleDistrictChange}
          >
            {districtData?.map((item, idx) => (
              <MenuItem key={idx} value={item}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <InputLabel sx={{ mt: "20px" }} id="demo-simple-select-label">
            Select Upozila
          </InputLabel>
          <Select
            fullWidth
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={upozila}
            name="upozila"
            onChange={handleUpozilaChange}
          >
            {upozilaData?.map((item, idx) => (
              <MenuItem key={idx} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>

          <InputLabel sx={{ mt: "20px" }} id="photo-level">
            Your Profile Photo
          </InputLabel>
          <TextField
            required
            fullWidth
            labelId="photo-level"
            id="photo-level"
            name="photo"
            type="file"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="Confirm_password"
            label="Confirm Password"
            type="password"
            id="confirm_password"
            autoComplete="current-password"
          />
          <Typography sx={{ color: "red" }}>{errorMsg}</Typography>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? (
              <Loading color="#fafdfb" height="25" width="25"></Loading>
            ) : (
              "Sign Up"
            )}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/login" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default Registration;
