import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Loading from "../../../../Utils/Loading/Loading";
import useAllUser from "../../../../Hooks/useAllUser";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const [allUsers, isPending, refetch] = useAllUser()

  if(isPending){
    return <Loading color="white" height={150} width={150} mt={6}></Loading>
  }

  const handleAdmin = async(id) => {
    const res = await axiosSecure.patch(`/users/admin/${id}`);
    console.log(res.data);
    refetch()
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mt: 4,
              borderBottom: 2,
            }}
          >
            All Users
          </Typography>
        </Box>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Blood Group
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                District
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {allUsers.map((user) => (
              <TableRow key={user._id} hover role="checkbox" tabIndex={-1}>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.blood}</TableCell>
                <TableCell align="center">{user.district}</TableCell>
                <TableCell align="center">
                  <IconButton aria-label="delete" color="primary">
                    <Delete />
                  </IconButton>
                  <Button onClick={()=>handleAdmin(user._id)} variant="text">{user?.role === 'admin'? 'Admin' : 'User'}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AllUser;
