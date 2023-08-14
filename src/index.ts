import express, { Request, Response } from 'express'
import path from 'path'
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

interface ExtendedSocket extends Socket {
  connectedRoom?: string;
}

const app = express();
// para crear un servidor scoket io necesitas declararle
// un servidor http en el que va correr.
// ahora esto es una manera de declararlo, quizás haya otra
// manera de realizarlo
const httpServer = createServer(app);

const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, "views")));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", (socket: ExtendedSocket) => {

  socket.connectedRoom = "";

  socket.on("connect to room", room => {

    // antes de meterlo a una sala hay que sacarlo al que estaba
    socket.leave(socket.connectedRoom!);

    switch(room) {
      case "room1":
        // si no existe va crear la sala
        socket.join("room1");
        socket.connectedRoom = "room1";
        break;

      case "room2":
        socket.join("room2");
        socket.connectedRoom = "room2";
        break;

      case "room3":
        socket.join("room3");
        socket.connectedRoom = "room3";
        break;
    }

  });

  socket.on("message", message => {
    const room = socket.connectedRoom;

    io.to(room!).emit("send message", {
      message,
      room
    });
  });

});

httpServer.listen(3000);

// On → Se usa para detectar (o escuchar) un evento varias veces.
// Once → Se usa para detectar (o escuchar) un evento una sola vez. Sin importar si el evento se emite varias veces.
// Off → Se usa para dejar de escuchar un evento, sin importar que este se siga emitiendo.