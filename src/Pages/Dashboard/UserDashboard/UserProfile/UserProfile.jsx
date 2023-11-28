import {
  Avatar,
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../Utils/Loading/Loading";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import { Update } from "@mui/icons-material";
import { useState } from "react";
import Swal from "sweetalert2";
import PageTitle from "../../../../Utils/PageTitle/PageTitle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#BEADFA",
  // width: 400,
  border: "2px solid white",
  boxShadow: 24,
  p: 1,
};

const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_API_KEY
}`;

const UserProfile = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [blood, setBlood] = useState('');

  const handleBloodChange = (event) => {
    setBlood(event.target.value);
  };

  const {
    data = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosPublic(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return <Loading color="black" height="40" width="40" mt={4}></Loading>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const district = e.target.district.value;
    const upozila = e.target.upozila.value;
    const blood = e.target.blood.value;
    const photo = e.target.photo.files[0];

    const imgFile = { image: photo };
    const res = await axiosPublic.post(imgUploadUrl, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.data.display_url) {
      const userInfo = {
        name: name,
        district: district,
        upozila: upozila,
        blood: blood,
        profileImage: res.data.data.display_url,
      };

      const response = await axiosPublic.put(`/users/${user?.email}`, userInfo);
      
      setLoading(false);
      if (response.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "User Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
      }
    }
  };

  return (
    <Paper>
      <PageTitle title='Profile'></PageTitle>
      <SectionTitle title="User Profile"></SectionTitle>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: 500, backgroundColor: "#FAF0E6" }}>
          <CardContent>
            <Avatar
              sx={{ width: 150, height: 150 }}
              alt="Remy Sharp"
              src={data[0].profileImage}
            />
            <Grid>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, display: "flex", gap: 1 }}
              >
                Name : <Typography fontWeight="bold">{data[0].name}</Typography>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Email : {data[0].email}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Blood Group : {data[0].blood}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                District : {data[0].district}
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
              >
                Thana : {data[0].upozila}
                <Button
                  onClick={() => setOpen(true)}
                  sx={{ mr: 1 }}
                  variant="outlined"
                  startIcon={<Update />}
                >
                  Update
                </Button>
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            fontWeight="bold"
            sx={{ textAlign: "center", mb: 3 }}
            id="modal-modal-title"
            variant="h4"
            component="h2"
          >
            Update Profile
          </Typography>

          <Paper sx={{ width: "100%" }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                "& .MuiTextField-root": { mt: 4 },
              }}
            >
              <Grid container spacing={2} sx={{ p: 1 }}>
                <Grid item sm={12} md={6}>
                  <TextField
                    fullWidth
                    id="name"
                    label={user.displayName}
                    name="name"
                    autoComplete="name"
                    autoFocus
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <TextField required fullWidth name="photo" type="file" />
                </Grid>
                <Grid item sm={12} md={6}>
                  <TextField
                    fullWidth
                    name="district"
                    label={data[0].district}
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
                  <Select
                  sx={{mt: 1}}
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
                </Grid>
                <Grid item sm={12} md={12}>
                  <TextField
                    fullWidth
                    label={data[0].upozila}
                    name="upozila"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? (
                  <Loading color="#fafdfb" height="25" width="25"></Loading>
                ) : (
                  "Update User"
                )}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </Paper>
  );
};

export default UserProfile;
