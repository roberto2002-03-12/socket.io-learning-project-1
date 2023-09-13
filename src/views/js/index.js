const socket = io();

const send = document.querySelector("#send");
const disconnect = document.querySelector("#disconnect");
const connect = document.querySelector("#connect");

send.addEventListener("click", () => {
  // si se desconecta y envias un monton de eventos
  // al conectarse nuevamente se enviará todos los datos
  // pendientes, sin embargo, esto no es bueno porque
  // puedes enviar varios datos y eso sobre carga el buffer
  // por lo que esta bien poner una condicional
  if (socket.connected) socket.emit("is connected", "Esta conectado");

  // en vez de usar el if puedes utilizar socket.volatile.emit
  // da el mismo resultado que el if, pero sin necesidad de utilizarlo
});

disconnect.addEventListener("click", () => {

  socket.disconnect();

});

connect.addEventListener("click", () => {

  socket.connect();

});