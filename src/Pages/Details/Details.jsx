import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Utils/Loading/Loading";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useBannerData from "../../Hooks/useBannerData";
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

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const Details = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [banner] = useBannerData();
  const [discountPrice, setDiscountPrice] = useState("");

  const {
    data = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["details"],
    queryFn: async () => {
      const res = await axiosSecure(`/tests?id=${id}`);
      return res.data[0];
    },
  });
  if (isPending) {
    return <Loading color="black" />;
  }

  const handleGetPrice = (e) => {
    e.preventDefault();
    const coupon = e.target.coupon.value;
    if (coupon == banner.couponCode) {
      const testPrice = data.price;
      const discount = banner.discount;
      const totalDiscount = testPrice - (discount / 100) * testPrice;
      setDiscountPrice(totalDiscount);
      e.target.reset();
      refetch();
    }
  };

  return (
    <Grid
      container
      sm={12}
      md={12}
      sx={{ display: "flex", justifyContent: "center", my: 6 }}
    >
      <PageTitle title='Details'></PageTitle>
      <Card sx={{ backgroundColor: "#A6F6FF" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={data.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ height: "60px", fontWeight: "bold" }}
            >
              {data.test_name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ height: "60px", margin: "5px 0px" }}
            >
              {data.details}
            </Typography>

            <Typography
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              Date : {data.date}
              <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                Available Slot : {data.slot}
              </Typography>
            </Typography>

            <Typography
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Test rate : ${data.price}
              {data.slot > 0 ? (
                <Button onClick={() => setOpen(true)} variant="contained">
                  Book Test
                </Button>
              ) : (
                <Button
                  disabled
                  onClick={() => setOpen(true)}
                  variant="contained"
                >
                  Book Test
                </Button>
              )}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
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
            Make Payment
          </Typography>
          <Box component={"form"} onSubmit={handleGetPrice} sx={{ mb: 1 }}>
            <input type="text" name="coupon" placeholder="Put discount code" />
            <input type="submit" value="Submit" />
          </Box>
          <Typography sx={{ mb: 3 }}>Your Amount : ${discountPrice}</Typography>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              discountPrice={discountPrice}
              id={id}
              testName={data.test_name}
              refetch={refetch}
            ></CheckoutForm>
          </Elements>
        </Box>
      </Modal>
    </Grid>
  );
};

export default Details;
