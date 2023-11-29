import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Utils/Loading/Loading";
import {
  Box,
  Button,
  Grid,
  Modal,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, Update } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import PageTitle from "../../../../Utils/PageTitle/PageTitle";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
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

const AllTest = () => {
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(0);

  const totalPage = Math.ceil(parseInt(totalData) / 6);
  const paginateBtn = [...Array(totalPage).keys()];

  axiosSecure("/totalTests").then((res) => setTotalData(res.data.count));

  const handleChange = (event, value) => {
    setPage(value - 1);
  };

  const {
    data: allTest = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["AdminAllTest"],
    queryFn: async () => {
      const res = await axiosSecure(`/tests?page=${page}`);
      return res.data;
    },
  });


  const handleDelete = async (id) => {
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
        axiosSecure.delete(`/tests/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Test has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleUpdate = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const photo = e.target.photo.files[0];
    const date = e.target.date.value;
    const price = e.target.price.value;
    const details = e.target.details.value;
    const slot = e.target.slot.value;

    const imgFile = { image: photo };
    const res = await axiosSecure.post(imgUploadUrl, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.data.display_url) {
      const testInfo = {
        test_name: name,
        image: res.data.data.display_url,
        date: date,
        price: parseInt(price),
        details: details,
        slot: slot,
      };

      const response = await axiosSecure.put(`/tests/${id}`, testInfo);
      setLoading(false);
      if (response.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Test Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
      }
    }
  };

  useEffect(()=>{
    refetch()
  }, [page])

  if (isPending) {
    return <Loading color="black" mt={4} height="40" width="40"></Loading>;
  }

  return (
    <TableContainer component={Paper} sx={{ overflow: "hidden" }}>
      <PageTitle title='All Test'></PageTitle>
      <SectionTitle title="All Test"></SectionTitle>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Test Name</StyledTableCell>
            <StyledTableCell align="center">Test Price</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {allTest.map((test) => (
            <StyledTableRow key={test._id}>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                {test.test_name}
              </StyledTableCell>
              <StyledTableCell align="center">${test.price}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  onClick={() => handleUpdate(test._id)}
                  sx={{ mr: 1 }}
                  variant="outlined"
                  startIcon={<Update />}
                >
                  Update
                </Button>
                <Button
                  onClick={() => handleDelete(test._id)}
                  variant="outlined"
                  startIcon={<Delete />}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        component={"div"}
        sx={{ display: "flex", justifyContent: "end", my: 1 }}
      >
        <Pagination
          variant="outlined"
          shape="rounded"
          count={paginateBtn.length}
          page={page + 1}
          onChange={handleChange}
        />
      </Box>
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
            Update Test
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
                    required
                    fullWidth
                    id="name"
                    label="new Test Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <TextField required fullWidth name="date" type="date" />
                </Grid>
                <Grid item sm={12} md={6}>
                  <TextField required fullWidth label="Price" name="price" />
                </Grid>
                <Grid item sm={12} md={6}>
                  <TextField required fullWidth label="slot" name="slot" />
                </Grid>
                <Grid item sm={12} md={12}>
                  <TextField required fullWidth name="photo" type="file" />
                </Grid>
                <Grid item sm={12} md={12}>
                  <TextField
                    fullWidth
                    label="Details"
                    name="details"
                    multiline
                    maxRows={10}
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
                  "Update Test"
                )}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </TableContainer>
  );
};

export default AllTest;
