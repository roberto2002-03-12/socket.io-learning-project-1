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

  socket.on("is connected", msg => {
    console.log(msg);
  });

});

httpServer.listen(3000);