import { Grid } from "@mui/material";
import Banner from "../../../Components/Home/Banner/Banner";
import FeaturedTest from "../../../Components/Home/FeaturedTest/FeaturedTest";
import HealthTips from "../../../Components/Home/HealthTips/HealthTips";

const Home = () => {
    return (
        <Grid sx={{minHeight: "calc(90vh)"}}>
            <Banner></Banner>
            <FeaturedTest></FeaturedTest>     
            <HealthTips></HealthTips>       
        </Grid>
    );
};

export default Home;