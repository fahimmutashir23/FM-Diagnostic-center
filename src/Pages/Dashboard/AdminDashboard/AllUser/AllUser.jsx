import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Avatar, Box, Button, Grid, IconButton, Modal, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Loading from "../../../../Utils/Loading/Loading";
import useAllUser from "../../../../Hooks/useAllUser";
import Swal from "sweetalert2";
import { useState } from "react";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import PageTitle from "../../../../Utils/PageTitle/PageTitle";

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

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const [allUsers, isPending, refetch] = useAllUser();
  const [userDetails, setUserDetails] = useState({});
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  if (isPending) {
    return <Loading color="black" height="40" width="40" mt={6}></Loading>;
  }

  const handleAdmin = async (id) => {
    const res = await axiosSecure.patch(`/users/admin/${id}`);
    if (res.data) {
      Swal.fire({
        title: "You are now Admin",
        icon: "success",
        confirmButtonText: "Cool",
      });
    }
    refetch();
  };

  const handleDetails = (id) => {
    setOpen(true);
    const userInfo = allUsers.find((user) => user._id === id);
    setUserDetails(userInfo);
  };

  const handleBlock = async (id) => {
    const res = await axiosSecure.patch(`/users/${id}`);
    console.log(res.data);
    refetch();
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <PageTitle title='All User'></PageTitle>
      <TableContainer sx={{ maxHeight: 440 }}>
        <SectionTitle title="All User" />
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Information
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {allUsers.map((user) => (
              <TableRow key={user._id} hover role="checkbox" tabIndex={-1}>
                <TableCell align="left">
                  {user.role === "admin" ? (
                    <Typography fontWeight="bold">{user.name}</Typography>
                  ) : (
                    user.name
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleDetails(user._id)}
                    variant="text"
                  >
                    Details
                  </Button>
                </TableCell>

                <TableCell align="center">
                  {user.role === "admin" ? (
                    <Button disabled variant="text">
                      {user?.active_status === "active" ? "Active" : "Block"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleBlock(user._id)}
                      variant="text"
                    >
                      {user?.active_status === "active" ? "Block" : "Active"}
                    </Button>
                  )}
                </TableCell>

                <TableCell align="center">
                  <IconButton aria-label="delete" color="primary">
                    <Delete />
                  </IconButton>
                  <Button onClick={() => handleAdmin(user._id)} variant="text">
                    {user?.role === "admin" ? "Admin" : "User"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            fontWeight="bold"
            sx={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
            User Information
          </Typography>
          <Grid container sx={{display: "flex", alignItems: 'center'}}>
            <Grid item sm={12} md={6}>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, display: "flex", gap: 1 }}
              >
                Name :{" "}
                <Typography fontWeight="bold">{userDetails.name}</Typography>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Email : {userDetails.email}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Blood Group : {userDetails.blood}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                District : {userDetails.district}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Thana : {userDetails.upozila}
              </Typography>
            </Grid>
            <Box sx={{width: 100, }}>
            <Avatar sx={{width: 150, height: 150}} alt="Remy Sharp" src={userDetails.profileImage} />
            </Box>
          </Grid>
        </Box>
      </Modal>
    </Paper>
  );
};

export default AllUser;
