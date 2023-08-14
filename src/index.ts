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

});

httpServer.listen(3000);

// On → Se usa para detectar (o escuchar) un evento varias veces.
// Once → Se usa para detectar (o escuchar) un evento una sola vez. Sin importar si el evento se emite varias veces.
// Off → Se usa para dejar de escuchar un evento, sin importar que este se siga emitiendo.