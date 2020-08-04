import openSocket from "socket.io-client";
const socket = openSocket("");

function updatePosition(cb) {
  socket.on("clientPosition", (position) => {
    console.log("CLIENT POSITION UPDATED");
    cb(null, position);
  });
}
export { updatePosition };
