import { Button, Grid, Typography } from "@mui/material";
import "./HomePage.css";
import video from "./whiteboard.mp4";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container_home">
      <Grid container spacing={2} style={{marginTop:"80px"}}>
        <Grid item xs={6}>
          <Typography
            variant="h4"
            style={{
              fontWeight: "bold",
              fontSize: "2.4rem",
              marginTop: "40px",
            }}
          >
            Welcome to the CollaboraSketch
          </Typography>
          <Typography
            variant="h4"
            style={{
              fontSize: "1.2rem",
              fontStyle: "normal",
              margin: "10px 20px 50px 0px",
              textAlign: "left",
            }}
          >
            Draw, sketch, and illustrate together in real-time. Share ideas
            visually, collaborate on diagrams, or just have fun doodling with
            your team or friends.
          </Typography>
          <Button
            variant="contained"
            className="btn"
            onClick={() => navigate("/User/forms")}
          >
            Create My Whiteboard
          </Button>
        </Grid>
        <Grid item xs={6} style={{ height: "60vh", width: "100vw" }}>
          <iframe src={video} className="video" title="video"></iframe>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
