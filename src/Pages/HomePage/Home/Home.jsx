import { Grid } from "@mui/material";
import Banner from "../../../Components/Home/Banner/Banner";
import FeaturedTest from "../../../Components/Home/FeaturedTest/FeaturedTest";
import HealthTips from "../../../Components/Home/HealthTips/HealthTips";
import PageTitle from "../../../Utils/PageTitle/PageTitle";

const Home = () => {
    return (
        <Grid sx={{minHeight: "calc(90vh)"}}>
            <PageTitle title='Home'></PageTitle>
            <Banner></Banner>
            <FeaturedTest></FeaturedTest>     
            <HealthTips></HealthTips>       
        </Grid>
    );
};

export default Home;