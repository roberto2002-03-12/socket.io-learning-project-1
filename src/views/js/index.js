const socket = io();

function checkSocketStatus() {
  console.log("Socket status: " + socket.connected)
}

socket.on("connect", () => {
  console.log("The socket has been connected: ", socket.id);
  checkSocketStatus();
});

socket.on("disconnect", () => {
  console.log("The socket has been disconnected: ", socket.id);
  checkSocketStatus();
});

socket.io.on("reconnect_attempt", () => {
  console.log("Trying to reconnect");
});

socket.io.on("reconnect", () => {
  console.log('Reconnected')
})

socket.on("welcome", data => {
  const text = document.querySelector("#text");
  text.textContent = data;
})

const emitToServer = document.querySelector("#emit-to-server");
// los clientes también pueden enviar eventos
emitToServer.addEventListener("click", () => {
  socket.emit("server", "hola");
})

socket.on("everyone", data => console.log(data));