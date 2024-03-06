import { useState, useRef, useEffect } from "react";

import "./index.css";

import WhiteBoard from "../../components/Whiteboard";
import Chat from "../../components/ChatBar";
import { toast } from "react-toastify";
import { Button, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VideoCall from "../../components/VideoCall/VideoCall";

const RoomPage = ({
  user,
  socket,
  videoGrid,
  setUsers,
  myPeer,
  connectToNewUser,
  addVideoStream,
}) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [openedChatTab, setOpenedChatTab] = useState(false);
  const [openVideo, setOpenVideo] = useState(true);

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect = "white";
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setElements([]);
  };

  const undo = () => {
    if (elements.length > 0) {
      setHistory((prevHistory) => [
        ...prevHistory,
        elements[elements.length - 1],
      ]);
      setElements((prevElements) => {
        const updatedElements = [...prevElements];
        updatedElements.pop();
        return updatedElements;
      });
    }
  };

  const redo = () => {
    if (history.length > 0) {
      setElements((prevElements) => [
        ...prevElements,
        history[history.length - 1],
      ]);
      setHistory((prevHistory) => {
        const updatedHistory = [...prevHistory];
        updatedHistory.pop();
        return updatedHistory;
      });
    }
  };

  const adduserIdInP = async (p, call, div, video) => {
    p.innerText = "Other User";
    div.append(p);
    call.on("stream", (userVideoStream) => {
      addVideoStream(div, video, userVideoStream);
    });
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        const div = document.createElement("div");
        div.id = user?.userId;
        const p = document.createElement("p");
        p.innerText = user?.name;
        div.append(p);
        myPeer.on("call", (call) => {
          console.log("call", call);
          call.answer(stream);
          const div = document.createElement("div");
          div.id = call.peer;
          const video = document.createElement("video");
          const p = document.createElement("p");
          adduserIdInP(p, call, div, video);
        });
      });
  }, []);

  useEffect(() => {
    socket.on("userJoinedMessageBroadcasted", (data) => {
      setUsers(data.users);
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          console.log(`${data.name} ${data.userId} joined the room`);
          toast.info(`${data.name} joined the room`);
          connectToNewUser(data.userId, data.name, stream);
        });
    });
  }, []);

  const handleOpenVideo = () => {
    setOpenVideo(!openVideo);
    setOpenedChatTab(false);
  };

  const handleOpenChatTab = () => {
    setOpenedChatTab(!openedChatTab);
    setOpenVideo(false);
  };

  return (
    <Grid container style={{ overflowY: "hidden !important" }}>
      <Grid item xs={9}>
        <div className="col-md-10 mt-4 mx-auto px-5 mb-3 d-flex align-items-center jusitfy-content-center">
          <div className="d-flex col-md-2 justify-content-center gap-2">
            <div className="d-flex gap-1 align-items-center">
              <label htmlFor="pencil">Pencil</label>
              <input
                type="radio"
                name="tool"
                id="pencil"
                checked={tool === "pencil"}
                value="pencil"
                className="mt-1"
                onChange={(e) => setTool(e.target.value)}
              />
            </div>
            <div className="d-flex gap-1 align-items-center">
              <label htmlFor="line">Line</label>
              <input
                type="radio"
                id="line"
                name="tool"
                value="line"
                checked={tool === "line"}
                className="mt-1"
                onChange={(e) => setTool(e.target.value)}
              />
            </div>
            <div className="d-flex  gap-1 align-items-center">
              <label htmlFor="rect">Rectangle</label>
              <input
                type="radio"
                name="tool"
                id="rect"
                checked={tool === "rect"}
                value="rect"
                className="mt-1"
                onChange={(e) => setTool(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3 mx-auto ">
            <div className="d-flex align-items-center justify-content-center">
              <label htmlFor="color">Select Color: </label>
              <input
                type="color"
                id="color"
                className="mt-1 ms-3"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3 d-flex gap-2">
            <button
              className="btn btn-primary mt-1"
              disabled={elements.length === 0}
              onClick={() => undo()}
            >
              Undo
            </button>
            <button
              className="btn btn-outline-primary mt-1"
              disabled={history.length < 1}
              onClick={() => redo()}
            >
              Redo
            </button>
          </div>
          <div className="col-md-2">
            <button className="btn btn-danger" onClick={handleClearCanvas}>
              Clear Canvas
            </button>
          </div>
        </div>
        <div className="col-md-11 mx-auto mt-4 canvas-box">
          <WhiteBoard
            canvasRef={canvasRef}
            ctxRef={ctxRef}
            elements={elements}
            setElements={setElements}
            color={color}
            tool={tool}
            user={user}
            socket={socket}
          />
        </div>
      </Grid>
      <Grid item xs={3}>
        <div
          style={{ margin: "30px 0px 20px 0px", display: "flex", gap: "20px" }}
        >
          <Button
            variant="contained"
            className="chat_btn"
            onClick={handleOpenVideo}
            style={{ backgroundColor: " #003399" }}
          >
            {openVideo ? "Close video chat" : "Open video chat"}
          </Button>
          <Button
            variant="contained"
            className="chat_btn"
            onClick={handleOpenChatTab}
            style={{ backgroundColor: "gray" }}
          >
            
            {openedChatTab ? "Close Chat Box" : "Open chat Box"}
          </Button>
        </div>
        {openedChatTab && (
          <Chat
            setOpenedChatTab={setOpenedChatTab}
            socket={socket}
            openVideo={openVideo}
          />
        )}
        {openVideo && (
          <div style={{ margin: "0px 20px 0px 10px" }}>
            <VideoCall videoGrid={videoGrid} />
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default RoomPage;
