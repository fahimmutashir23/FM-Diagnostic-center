import { Grid } from "@mui/material";
import Banner from "../../../Components/Home/Banner/Banner";

const Home = () => {
    return (
        <Grid sx={{minHeight: "calc(90vh)"}}>
            <Banner></Banner>            
        </Grid>
    );
};

export default Home;