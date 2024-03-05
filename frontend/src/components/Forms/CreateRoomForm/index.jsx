import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";
import Peer from "peerjs";
import "./index.css";

const CreateRoomForm = ({ uuid, socket, setUser, setMyPeer }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();
    const myPeer = new Peer(undefined, {
      host: "localhost",
      port: 5001, 
      path: "/",
      secure: false,
    });
    

    setMyPeer(myPeer);
    myPeer.on("open", (id) => {
      const roomData = {
        name,
        roomId,
        userId: id,
        host: true,
        presenter: true,
      };
      setUser(roomData);
      navigate(`/${roomId}`);
      console.log(roomData);
      socket.emit("userJoined", roomData);
    });
    myPeer.on("error", (err) => {
      console.log("peer connection error", err);
      myPeer.reconnect();
    });
  };

  return (
    <div className="create_room_form">
       {/* <Typography
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
          </Typography> */}
      <Box
        height={400}
        width={500}
        gap={4}
        p={2}
        my={4}
        sx={{ border: "2px solid #000000" }}
      >
        <Typography
          variant="h4"
          className="typo"
          style={{
            fontWeight: "bold",
            fontSize: "1.8rem",
          }}
        >
          Create Room Form
        </Typography>
        <form className="form">
          <div className="form_group">
            <TextField
              variant="outlined"
              size="medium"
              fullWidth
              label="Enter your name"
              sx={{ maxWidth: "100%", marginBottom: "20px" }}
              color="primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="btns_form">
              <TextField
                variant="outlined"
                size="medium"
                fullWidth
                value={roomId}
                aria-readonly={true}
                label="Generate room code"
                sx={{ maxWidth: "100%" }}
                color="primary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ padding: "10px" }}>
                      <Button
                        variant="contained"
                        size="small"
                        style={{
                          textTransform: "capitalize",
                          backgroundColor: "green",
                          marginRight: "10px",
                        }}
                        onClick={() => setRoomId(uuid())}
                      >
                        Generate
                      </Button>
                      <CopyToClipboard text={roomId}>
                        <Button
                          variant="contained"
                          size="small"
                          style={{
                            textTransform: "capitalize",
                            backgroundColor: "red",
                          }}
                        >
                          Copy
                        </Button>
                      </CopyToClipboard>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <Button
              variant="contained"
              style={{
                marginTop: "30px",
                textTransform: "capitalize",
                backgroundColor: "#0047AB",
              }}
              fullWidth
              type="submit"
              onClick={handleCreateRoom}
            >
              Generate Room
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default CreateRoomForm;
