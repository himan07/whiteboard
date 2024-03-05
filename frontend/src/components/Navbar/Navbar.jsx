import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./navbar.css";

const Navbar = ({ user }) => {
  console.log("user", user);
  return (
    <AppBar position="static" className="app_bar">
      <Toolbar>
        {/* <IconButton
          size="large"
          edge="start"
          color="gray"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: "black",
            textAlign: "left",
            fontWeight: "bolder",
            fontSize: "1.5rem",
          }}
        >
          CollaboraSketch
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "blue",
            fontWeight: "bolder",
            fontSize: "1rem",
          }}
        >
         <AccountCircleIcon style={{height:"30px", width:"30px"}}/> {user?.name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
