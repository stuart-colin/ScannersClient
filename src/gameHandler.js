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

// socket.on("clientPosition", (data) => {
//   console.log(data);
// });

function updateClientPlayer(cb) {
  socket.on("clientPlayer", (clientData) => {
    // console.log("CLIENT UPDATED");
    // console.log(JSON.parse(clientData));
    clientData = JSON.parse(clientData);
    let state = {
      position: clientData.client_position,
      rotation: clientData.client_rotation,
    };
    // console.log("PASSING STATE");
    // console.log(state);
    cb(null, state);
  });
}

async function SendMarker(position) {
  let data = await axios.post(`http://localhost:3333/game/marker`, {
    user: socket.id,
    marker_position: position,
  });
}

//export { updatePosition };
export default { SendMarker, updateClientPlayer };
