const socket = io();

// mover circulo con raton
const circle = document.querySelector("#circle");

const dragCircle = position => {
  circle.style.top = position.top;
  circle.style.left = position.left;
}

const drag = (event) => {
  // const clientX = event.clientX;
  // const clientY = event.clientY;

  const position = {
    top: event.clientY + "px",
    left: event.clientX + "px"
  }
  
  // emit emite un evento a todos los clientes conectados
  // es por eso que si tienes dos pestallas veras que el circulo
  // se mueve porque manda este evento a todos los clientes conectados
  // socket.emit("circle position", {
  //   top: clientY + "px",
  //   left: clientX + "px"
  // });

  // debido a que estamos usando broadcast no vamos a ver
  // los cambios, pero los otros clientes si, por eso es necesario
  // ejecutar la función de manera local para que el cliente que hace
  // dicha acción también lo pueda ver.
  dragCircle(position);
  socket.emit("circle position", position);

  // circle.style.top = clientY + "px";
  // circle.style.left = clientX + "px";
}

document.addEventListener("mousedown", (event) => {
  document.addEventListener("mousemove", drag)
});

document.addEventListener("mouseup", (event) => {
  document.removeEventListener("mousemove", drag);
});

socket.on("move circle", position => {
  // se establece nuevos valores que se iran actualizando
  // a tiempo real, creando un efecto drag an drop.
  // circle.style.top = position.top;
  // circle.style.left = position.left;
  dragCircle(position);
});