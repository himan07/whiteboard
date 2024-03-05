import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import "./index.css";

const Chat = ({ socket }) => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [openVideo, setOpenVideo] = useState(true);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setChat((prevChats) => [...prevChats, data]);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      setChat((prevChats) => [...prevChats, { message, name: "" }]);
      socket.emit("message", { message });
      setMessage("");
    }
  };

  return (
    <>
      <div className="chat_container">
        <h5 style={{ margin: "0px 10px 30px 10px" }}>In-room messages</h5>
        <div
          style={{
            height: window.innerHeight - 290,
            overflow: "auto",
          }}
        >
          {chat.map((msg, index) => (
            <p
              key={index * 999}
              style={{
                textAlign: msg.name?.length === 0 ? "right" : "left",
                margin: "20px 10px 10px 5px ",
                maxWidth: "100%",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              <span>{msg.name?.length === 0 ? "You" : msg.name}</span>
              <br />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#336699",
                }}
              >
                {msg.message}
              </span>
            </p>
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "5px",
            marginBottom: 0,
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Enter Message"
            size="small"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="contained"
            size="small"
            type="submit"
            style={{ textTransform: "capitalize", backgroundColor: " #003399" }}
          >
            Send
          </Button>
        </form>
      </div>
    </>
  );
};

export default Chat;
