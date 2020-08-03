import io from "socket.io-client";
import axios from "axios";
const socket = io("http://localhost:3333");

if (!socket.connected) {
  socket.on("connect", (data) => {
    console.log("Connecting as");
    console.log(data);
  });
} else {
  console.log("Already Connected");
}

async function SendMarker(position) {
  let data = await axios.post(`http://localhost:3333/game/marker`, {
    user: socket.id,
    marker_position: position,
  });
}

export default { SendMarker };
