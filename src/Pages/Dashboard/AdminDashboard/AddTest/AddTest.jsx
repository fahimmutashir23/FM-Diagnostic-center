import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_API_KEY
}`;

const AddTest = () => {
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.files[0];
    const date = e.target.date.value;
    const price = e.target.price.value;
    const details = e.target.details.value;

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
      };

      const response = await axiosSecure.post("/tests", testInfo);
      console.log(response.data);
      if (response.data.insertedId) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Test Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
      }
    }
  };
  return (
    <Paper sx={{ width: "100%" }}>
      <SectionTitle title="Add Test"></SectionTitle>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& .MuiTextField-root": { mt: 4 },
        }}
      >
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <TextField
              required
              fullWidth
              id="name"
              label="Test Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <TextField required fullWidth name="photo" type="file" />
          </Grid>
          <Grid item sm={12} md={6}>
            <TextField required fullWidth name="date" type="date" />
          </Grid>
          <Grid item sm={12} md={6}>
            <TextField required fullWidth label="Price" name="price" />
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
          Add Test
        </Button>
      </Box>
    </Paper>
  );
};

export default AddTest;
