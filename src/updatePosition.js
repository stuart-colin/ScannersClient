import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3001");

function updatePosition(cb) {
  socket.on("updatePosition", (position) => cb(null, position));
}
export { updatePosition };
