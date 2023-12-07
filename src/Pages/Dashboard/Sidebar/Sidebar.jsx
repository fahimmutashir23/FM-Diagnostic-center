import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import Logo from "../../../Utils/Logo/Logo";
import {
  AddBox,
  AddCircleSharp,
  ArrowForwardIos,
  Biotech,
  CalendarMonth,
  CalendarMonthOutlined,
  Home,
  Person,
  Rectangle,
} from "@mui/icons-material";
import useAdmin from "../../../Hooks/useAdmin";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Sidebar = () => {
  const [isAdmin] = useAdmin();
  const [open, setOpen] = useState(true);

  return (
    <div className="relative">
      {open ? (
        <button
          className="absolute transition-all duration-1000 top-60 left-56 bg-blue-700 py-2 px-1 text-white rounded-l-3xl z-10"
          onClick={() => setOpen(!open)}
        >
          <ArrowBackIosIcon />
        </button>
      ) : (
        <button className="absolute top-60 left-2 bg-blue-700 py-2 px-1 text-white rounded-r-3xl transition-all duration-1000 z-10" onClick={() => setOpen(!open)}>
          <ArrowForwardIos />
        </button>
      )}
      <div
        className={`bg-blue-400  min-h-screen ${
          open ? "w-64 transition-all duration-1000" : "absolute w-64 -translate-x-80 transition-all duration-1000"
        } `}
      >
        <Box sx={{ width: "150px", mx: "auto" }}>
          <Logo></Logo>
        </Box>
        {isAdmin ? (
          <ul>
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Admin Home" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/dashboard/allUser"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary="All User" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/dashboard/allTest"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Biotech />
                  </ListItemIcon>
                  <ListItemText primary="All Test" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/dashboard/addTest"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AddCircleSharp />
                  </ListItemIcon>
                  <ListItemText primary="Add Test" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/dashboard/allBanner"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Rectangle />
                  </ListItemIcon>
                  <ListItemText primary="All Banner" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/dashboard/addBanner"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AddBox />
                  </ListItemIcon>
                  <ListItemText primary="Add Banner" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/dashboard/reservation"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CalendarMonth />
                  </ListItemIcon>
                  <ListItemText primary="Reservation" />
                </ListItemButton>
              </ListItem>
            </Link>
          </ul>
        ) : (
          <List>
            <Link
              to="/dashboard/userHome"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="User Home" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/dashboard/myProfile"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary="My Profile" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/dashboard/testResult"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Biotech />
                  </ListItemIcon>
                  <ListItemText primary="Test Report" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/dashboard/appointment"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CalendarMonthOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Upcoming Appointment" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        )}

        <List>
          <Divider />
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
