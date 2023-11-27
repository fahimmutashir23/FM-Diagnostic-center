import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { useSwiper } from "swiper/react";

const SwiperBtn = () => {
  const swiper = useSwiper();
  return (
    <Grid>
      <IconButton onClick={() => swiper.slidePrev()} color="primary">
        <NavigateBefore></NavigateBefore>
      </IconButton>

      <IconButton onClick={() => swiper.slideNext()} color="primary">
        <NavigateNext></NavigateNext>
      </IconButton>
    </Grid>
  );
};

export default SwiperBtn;
