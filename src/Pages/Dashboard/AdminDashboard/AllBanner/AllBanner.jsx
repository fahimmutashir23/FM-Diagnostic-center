import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Utils/Loading/Loading";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Swal from "sweetalert2";

const AllBanner = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["bookedTest"],
    queryFn: async () => {
      const res = await axiosSecure(`/banners`);
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
        axiosSecure.delete(`/banners/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Banner has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleDisplayBanner = (id) => {
    console.log(id);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Banner Name</TableCell>
            <TableCell align="center">Active Status</TableCell>
            <TableCell align="center">Make Display</TableCell>
            <TableCell align="center">Delete Banner</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((banner, idx) => (
            <TableRow
              key={banner._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">
                {idx + 1}. {banner.name}
              </TableCell>
              <TableCell align="center">{banner.isActive}</TableCell>
              <TableCell align="center">
                {banner.isActive === "false" ? (
                  <Button onClick={() => handleDisplayBanner(banner._id)}>
                    Show Home
                  </Button>
                ) : (
                  <Button disabled>Show Home</Button>
                )}
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => handleDelete(banner._id)}
                  endIcon={<Delete></Delete>}
                ></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllBanner;
