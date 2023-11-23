import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import { Container } from "@mui/material";
import Footer from "../Shared/Footer/Footer";



const MainLayout = () => {
    return (
        <Container maxWidth="lg">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </Container>
    );
};

export default MainLayout;