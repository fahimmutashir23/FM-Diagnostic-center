import { Grid, Paper, Typography } from "@mui/material";
import SectionTitle from "../../SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Utils/Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const HealthTips = () => {
  const axiosPublic = useAxiosPublic();

  const { data = [], isPending } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await axiosPublic("/doctors");
      return res.data;
    },
  });

  if (isPending) {
    return <Loading color="black" height="40" width="40" mt={6}></Loading>;
  }

  return (
    <Grid>
      <SectionTitle title="Health Tips"></SectionTitle>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {data.map((doctor) => (
          <SwiperSlide key={doctor._id}>
            <Grid
            data-aos='zoom-in'
              container
              component={Paper}
              sx={{ my: 2, maxWidth: "700px", mx: "auto" }}
            >
              <Grid
                item
                sm={12}
                md={6}
                sx={{ width: "50%", overflow: "hidden" }}
              >
                <img
                  src={doctor.doctor_img}
                  alt=""
                  style={{ height: "300px", width: "100%" }}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography
                  sx={{
                    ml: "10px",
                    mt: "16px",
                    color: "#9400FF",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {doctor.doctor_name}
                </Typography>
                <Typography
                  sx={{
                    ml: "10px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  {doctor.specialist}
                </Typography>
                <Typography
                  sx={{
                    ml: "10px",
                    mt: "10px",
                    color: "#451952",
                    fontSize: "14px",
                  }}
                >
                  <strong>Health Tips: </strong>
                  {doctor.health_tips}
                </Typography>
              </Grid>
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};

export default HealthTips;
