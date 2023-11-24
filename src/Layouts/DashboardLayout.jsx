import { Outlet } from "react-router-dom";
import Sidebar from "../Pages/Dashboard/Sidebar/Sidebar";
import { Container } from "@mui/material";


const DashboardLayout = () => {
    return (
        <Container maxWidth="lg" sx={{display: 'flex', gap: '10px'}}>
            <Sidebar></Sidebar>
            <Outlet></Outlet>
        </Container>
    );
};

export default DashboardLayout;