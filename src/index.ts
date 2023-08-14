import express, { Request, Response } from 'express'
import path from 'path'
import { createServer } from 'http';
import { Server } from 'socket.io';

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

io.on("connection", socket => {

  socket.on("circle position", position => {
    // crear un evento para todos los clientes
    // io.emit("move circle", position);
    // un broadcast sirve para crear un evento
    // que todos los clientes lo van a ver menos 
    // la persona que realiza dicha acción
    socket.broadcast.emit("move circle", position);
  });

});

httpServer.listen(3000);

// On → Se usa para detectar (o escuchar) un evento varias veces.
// Once → Se usa para detectar (o escuchar) un evento una sola vez. Sin importar si el evento se emite varias veces.
// Off → Se usa para dejar de escuchar un evento, sin importar que este se siga emitiendo.