import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Utils/Loading/Loading";
import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import PageTitle from "../../Utils/PageTitle/PageTitle";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#BEADFA",
  width: 400,
  border: "2px solid white",
  boxShadow: 24,
  p: 4,
};

const DoctorsMeet = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  axiosPublic(`/users?email=${user?.email}`).then((res) => {
    setStatus(res.data[0]?.active_status);
  });

  const { data = [], isPending } = useQuery({
    queryKey: ["doctorsMeet"],
    queryFn: async () => {
      const res = await axiosSecure("/doctors");
      return res.data;
    },
  });
  if (isPending) {
    return <Loading color="black" height="40" width="40" mt={6}></Loading>;
  }
  return (
    <Grid component={Paper}>
      <PageTitle title="Doctor's Meet"></PageTitle>
      <SectionTitle title="Meet the Doctor" />
      <Grid container sx={{ margin: "10px 0px" }}>
        {data.map((test) => (
          <Grid key={test._id} item sm={12} md={4}>
            <Card sx={{ backgroundColor: "#A6F6FF", m: 1 }}>
              <CardActionArea>
                <div className="h-72 w-full overflow-hidden">
                  <img
                    src={test.doctor_img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {test.doctor_name}
                  </Typography>
                  <Typography
                    gutterBottom
                    component="div"
                    sx={{ fontWeight: "bold", mt: "-10px" }}
                  >
                    {test.specialist}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Test rate : ${test.doctors_fee}
                  </Typography>
                  <div className="flex justify-between">
                    <Button variant="contained">Doctor Details</Button>
                    {status === "active" ? (
                      <Button onClick={() => setOpen(true)} variant="contained">
                        Join
                      </Button>
                    ) : (
                      <Button disabled variant="contained">
                        Join
                      </Button>
                    )}
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            fontWeight="bold"
            sx={{ textAlign: "center", mb: 4 }}
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
            Request to Meet
          </Typography>
          <Box
            component={"form"}
            sx={{ mb: 1, display: "flex", flexDirection: "column", gap: 1 }}
          >
            <input type="text" name="name" placeholder="Your Name" />
            <input type="email" name="email" placeholder="Your Email" />
            <input type="submit" value="Submit" />
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};

export default DoctorsMeet;
