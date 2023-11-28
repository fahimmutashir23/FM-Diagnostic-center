import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import SectionTitle from "../../SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loading from "../../../Utils/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import SwiperBtn from "../../../Utils/SwiperBtn/SwiperBtn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";



const FeaturedTest = () => {
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth();
  const [status, setStatus] = useState('');

  axiosPublic(`/users?email=${user?.email}`)
  .then(res => {setStatus(res.data[0]?.active_status)})

  const { data = [], isPending } = useQuery({
    queryKey: ["featured"],
    queryFn: async () => {
      const res = await axiosPublic(`/tests?sort=dec`);
      return res.data;
    },
  });

  if (isPending) {
    return <Loading color="black" height="40" width="40" mt={6}></Loading>;
  }
  
  return (
    <Grid>
      <SectionTitle title="Featured Test"></SectionTitle>
      <Grid data-aos="zoom-in" container sx={{ margin: "10px 0px" }}>
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={0}
          loop={true}
          slidesPerView={4}
        >
          {data.map((test) => (
            <SwiperSlide key={test._id}>
              {status === 'active' ? <Link to={`/details/${test._id}`} style={{textDecoration: 'none'}}>
                <Card sx={{ backgroundColor: "#FFA3FD", m: 1 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={test.image}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ height: "60px" }}
                      >
                        {test.test_name}
                      </Typography>
                      <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                        Available Slot : {test.slot}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link> :
              <Card sx={{ backgroundColor: "#FFA3FD", m: 1 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={test.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ height: "60px" }}
                  >
                    {test.test_name}
                  </Typography>
                  <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                    Available Slot : {test.slot}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
              }
            </SwiperSlide>
          ))}
        </Swiper>
        <Grid>
          <SwiperBtn></SwiperBtn>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FeaturedTest;
