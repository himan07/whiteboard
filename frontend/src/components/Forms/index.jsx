import { Grid } from "@mui/material";
import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";
import "./index.css";

const Forms = ({ uuid, socket, setUser, setMyPeer }) => {
  return (
    <div className="forms" style={{marginTop:"50px"}}>
      <Grid container spacing={2}>
      <Grid item xs={6}>
        <CreateRoomForm
          uuid={uuid}
          setMyPeer={setMyPeer}
          socket={socket}
          setUser={setUser}
        />
        </Grid>
        <Grid item xs={6}>
        <JoinRoomForm
          uuid={uuid}
          setMyPeer={setMyPeer}
          socket={socket}
          setUser={setUser}
        />
        </Grid>
        </Grid>
      </div>
  );
};

export default Forms;
