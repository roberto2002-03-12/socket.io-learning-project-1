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
  // console.log("Users connected: ", io.engine.clientsCount)
  // console.log("User connected id: ", socket.id);
  // socket.on('disconnect'
  // son eventos establecidos por defecto, no porque se me haya venido la gana
  // declaras el evento que puede ser connected o disconnected y de este puedes
  // realizar acciones custom que desees.
  // socket.on('disconnect', () => {
  //   console.log("The user with id: ", socket.id, " has disconnected");
  // });

  socket.conn.once("upgrade", () => {
    console.log("Hemos pasado de HTTP Long-Polling a", socket
    .conn.transport.name);
  });

  // emitir un evento basico
  socket.emit("welcome", "hola");
  // recibir evento creado por lado de cliente
  // socket.on("server", data => console.log(data));
  // crear un evento para todos
  io.emit("everyone", socket.id + " se ha conectado");
});

httpServer.listen(3000);

// On → Se usa para detectar (o escuchar) un evento varias veces.
// Once → Se usa para detectar (o escuchar) un evento una sola vez. Sin importar si el evento se emite varias veces.
// Off → Se usa para dejar de escuchar un evento, sin importar que este se siga emitiendo.