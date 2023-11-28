import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Loading from "../../../../Utils/Loading/Loading";
import PageTitle from "../../../../Utils/PageTitle/PageTitle";

const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_API_KEY
}`;

const AddBanner = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const title = e.target.title.value;
    const discount = e.target.discount.value;
    const couponCode = e.target.couponCode.value;
    const description = e.target.description.value;
    const photo = e.target.photo.files[0];
    console.log(title, discount,couponCode,description,name,photo);


    const imgFile = { image: photo };
    const res = await axiosPublic.post(imgUploadUrl, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.data.display_url) {
      const bannerInfo = {
        title: title,
        name: name,
        couponCode: couponCode,
        discount: discount,
        description: description,
        image: res.data.data.display_url,
        isActive: 'false',
      };

      const response = await axiosSecure.post(`/banners`, bannerInfo);

      setLoading(false);
      if (response.data.insertedId) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Banner Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
      }
    }
  };

  return (
    <Box>
      <PageTitle title='Add Banner'></PageTitle>
      <Typography
        fontWeight="bold"
        sx={{ textAlign: "center", mb: 3 }}
        id="modal-modal-title"
        variant="h4"
        component="h2"
      >
        Add Banner
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
                label="Banner Name"
                name="name"
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <TextField
                required
                fullWidth
                label="Title"
                name="title"
                autoComplete="title"
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <TextField required fullWidth name="photo" type="file" />
            </Grid>
            <Grid item sm={12} md={6}>
              <TextField
                required
                fullWidth
                name="couponCode"
                label="Coupon Code"
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <TextField required fullWidth label="Discount" name="discount" />
            </Grid>
            <Grid item sm={12} md={6}>
            <TextField
              fullWidth
              required
              label="Description"
              name="description"
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
              "Add Banner"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddBanner;
