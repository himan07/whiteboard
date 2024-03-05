import React, { useState, useRef, useEffect } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

const VideoCall = (props) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isStreamLoaded, setIsStreamLoaded] = useState(false);
  const localStreamRef = useRef(null);

  useEffect(() => {
    const getLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (props.videoGrid.current) {
          const div = document.createElement("div");
          const video = document.createElement("video");
          video.srcObject = stream;
          video.addEventListener("loadedmetadata", () => {
            video.play();
            setIsStreamLoaded(true);
          });
          div.append(video);
          props.videoGrid.current.appendChild(div);
          localStreamRef.current = stream;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    getLocalStream();

    return () => {
      const stream = localStreamRef.current;
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [props.videoGrid]);

  const handleToggleMute = () => {
    const localStream = localStreamRef.current;

    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = !isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  return (
    <Grid container>
      <Box>
        <div
          className="video-grid h-100 w-100 py-2"
          style={{
            zIndex: 1000,
          }}
          ref={props.videoGrid}
        >
          {isStreamLoaded && (
            <IconButton onClick={handleToggleMute} style={{ color: "white" }}>
              {isMuted ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
          )}
        </div>
      </Box>
    </Grid>
  );
};

export default VideoCall;
