import openSocket from "socket.io-client";
const socket = openSocket("https://as-scanners-api.herokuapp.com/");

function updatePosition(cb) {
  socket.on("updatePosition", (position) => cb(null, position));
}
export { updatePosition };
