import { Outlet } from "react-router-dom";
import Sidebar from "../Pages/Dashboard/Sidebar/Sidebar";
import { Box, Container } from "@mui/material";

const DashboardLayout = () => {
  return (
    <Container maxWidth="lg" sx={{ display: "flex", gap: "10px" }}>
      <Box >
        <Sidebar></Sidebar>
      </Box>
      <Outlet></Outlet>
    </Container>
  );
};

export default DashboardLayout;
