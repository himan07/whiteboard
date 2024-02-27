import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { Box, Button, TextField, Typography } from "@mui/material";
import "./index.css";

const JoinRoomForm = ({ uuid, socket, setUser, setMyPeer }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleRoomJoin = (e) => {
    e.preventDefault();

    // open peer connccction with socket.io server
    const myPeer = new Peer(undefined, {
      host: "/",
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
        host: false,
        presenter: false,
      };
      setUser(roomData);
      navigate(`/${roomId}`);
      socket.emit("userJoined", roomData);
    });
    myPeer.on("error", (err) => {
      console.log("peer connection error", err);
      myPeer.reconnect();
    });
  };

  return (
    <div className="join_room_form">
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
          Join Room Form
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
                label="Enter room code"
                sx={{ maxWidth: "100%" }}
                color="primary"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </div>
            <Button
              variant="contained"
              type="submit"
              style={{
                marginTop: "30px",
                textTransform: "capitalize",
                backgroundColor: "#0047AB",
              }}
              fullWidth
              onClick={handleRoomJoin}
            >
              Join Room
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default JoinRoomForm;
