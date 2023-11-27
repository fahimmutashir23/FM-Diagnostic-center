import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import { Delete } from "@mui/icons-material";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../Utils/Loading/Loading";
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0079FF",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Appointments = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const {
    data = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["bookedTest"],
    queryFn: async () => {
      const res = await axiosPublic(`/payments?email=${user?.email}`);
      return res.data;
    },
  });
  if (isPending) {
    return <Loading color="black"></Loading>;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/payments/${id}`).then((res) => {
          
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              position: "top",
              icon: "success",
              title: "Test Deleted Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };
  return (
    <TableContainer component={Paper} sx={{ overflow: "hidden" }}>
      <SectionTitle title="Upcoming Appointment"></SectionTitle>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Test Name</StyledTableCell>
            <StyledTableCell align="center">Test Price</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((test) => (
            <StyledTableRow key={test._id}>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                {test.testName}
              </StyledTableCell>
              <StyledTableCell align="center">{test.amount}</StyledTableCell>
              <StyledTableCell align="center">{test.status}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  onClick={() => handleDelete(test._id)}
                  variant="outlined"
                  startIcon={<Delete />}
                >
                  Delete Booking
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Appointments;
