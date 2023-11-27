import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import Logo from "../../Utils/Logo/Logo";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";


const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState();
  const [anchorElUser, setAnchorElUser] = useState();
  const { user, logOutUser } = useAuth();

  const pages = (
    <Box sx={{ display: "flex" }}>
      <NavLink to="/" style={{textDecoration: 'none'}}>
        <Button  sx={{ my: 2, color: "white", display: "block" }}>Home</Button>
      </NavLink>
      <NavLink to='/blog' style={{textDecoration: 'none'}}>
        <Button  sx={{ my: 2, color: "white", display: "block" }}>blog</Button>
      </NavLink>
      <NavLink to='/contact' style={{textDecoration: 'none'}}>
        <Button  sx={{ my: 2, color: "white", display: "block" }}>Contact</Button>
      </NavLink>
      {user && <NavLink to='/doctorsMeet' style={{textDecoration: 'none'}}>
        <Button  sx={{ my: 2, color: "white", display: "block" }}>Doctors Meet</Button>
      </NavLink>}
    </Box>
  );


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar disableGutters sx={{ px: 4, backgroundColor: "#6b7cff" }}>
        <Logo width="100px"></Logo>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages}
          </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}
        >
          {pages}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          {user? <Tooltip>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={user?.photoURL} />
            </IconButton>
          </Tooltip> : 
          <Link to="/login" style={{textDecoration: 'none'}}><Button variant="contained" sx={{ my: 2, color: "white", display: "block"}}>login</Button></Link>
          }
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {user? <MenuItem>
              <Typography textAlign="center">{user?.displayName}</Typography>
            </MenuItem> : ""}
            <MenuItem>
              <Link to="/dashboard" style={{textDecoration: 'none', color: 'black'}}><Typography textAlign="center">Dashboard</Typography></Link>
            </MenuItem>
            {user? <MenuItem onClick={()=> logOutUser()}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem> : " "}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
