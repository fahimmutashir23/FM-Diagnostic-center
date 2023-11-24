import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../Utils/Logo/Logo";
import {
  AddBox,
  AddCircleSharp,
  Biotech,
  CalendarMonth,
  Home,
  Person,
  Rectangle,
} from "@mui/icons-material";

const Sidebar = () => {
  const [state, setState] = useState({
    left: true,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const admin = true;

  return (
    <div>
      <Box
        sx={{ width: "250px", backgroundColor: "#8F9CFF", minHeight: "100vh" }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <Box sx={{ width: "150px", mx: "auto" }}>
          <Logo></Logo>
        </Box>
        {admin ? (
          <List>
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
          </List>
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
                  <ListItemText primary="Test Result" />
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
                    <Biotech />
                  </ListItemIcon>
                  <ListItemText primary="Upcoming Appointment" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        )}

        <Divider />

        <List>
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
      </Box>
    </div>
  );
};

export default Sidebar;
