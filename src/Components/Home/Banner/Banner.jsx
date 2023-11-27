import { Box, Button, Typography } from "@mui/material";
import bannerBG from "../../../assets/image/medicalBanner.jpg";
import Loading from "../../../Utils/Loading/Loading";
import { Send } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useBannerData from "../../../Hooks/useBannerData";

const Banner = () => {
 
  const [banner, isPending, refetch] = useBannerData()
  
  if (isPending) {
    return <Loading color="black" height="40" width="40" mt={6}></Loading>;
  }
  refetch();

  return (
    <Box
    data-aos='fade-down'
      sx={{
        minHeight: "70vh",
        mt: 1,
        backgroundImage: `url(${bannerBG})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        gap: 2,
      }}
    >
      <Box sx={{ width: "50%", p: 2 }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          {banner.title}
        </Typography>
        <Typography sx={{ textAlign: "center", maxWidth: "500px", mx: "auto" }}>
          {banner.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#8CABFF",
            borderRadius: "10px",
            gap: 5,
            margin: '20px 0px'
          }}
        >
          <Typography
            sx={{
              fontSize: 70,
              fontWeight: "bold",
              color: "blue",
              display: "flex",
              alignItems: "end",
            }}
          >
            {banner.discount}%
            <Typography sx={{ fontSize: 25, color: "#331D2C" }}>
              Discount
            </Typography>
          </Typography>
          <Typography
            sx={{
              backgroundColor: "blue",
              color: "white",
              padding: "4px 20px",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
          >
            {banner.couponCode}
          </Typography>
        </Box>
        <Link to='/allTest'>
        <Button variant="contained" endIcon={<Send></Send>}>All Test</Button>
        </Link>
      </Box>
      <Box sx={{ width: "50%", overflow: "hidden" }}>
        <Box>
          <img src={banner.image} alt="" />
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
