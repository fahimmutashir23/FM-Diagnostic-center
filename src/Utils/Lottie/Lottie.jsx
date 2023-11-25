import { Player } from "@lottiefiles/react-lottie-player";
import { Box } from "@mui/material";
import lottie from "../../assets/image/Animation - 1700845372772.json";


const Lottie = () => {
    return (
        <Box sx={{width: 100}}>
        <Player src={lottie} className="Player" loop autoplay />
      </Box>
    );
};

export default Lottie;