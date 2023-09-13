const socket = io({
  auth: {
    token: "Mr. Michi es genial"
  }
});

// Caso de error
socket.on("connect_error", err => {

  console.log("Error de conexión");
  console.log(err.message);
  console.log(err.data.details);

});