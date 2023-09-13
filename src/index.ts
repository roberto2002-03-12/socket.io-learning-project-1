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

interface CustomError extends Error {
  data?: {
    details: string;
  }
}

// middleware para determinar si esta autenticado o no
io.use((socket, next) => {
  
  const token: string = socket.handshake.auth.token;

  if (token === 'Mr. Michi es genial') {
    next();
  }

  const error: CustomError = new Error("No puedes pasar");
  error.data = {
    details: 'No pudiste ser autenticado'
  }

  next(error);

});

io.on("connection", (socket: ExtendedSocket) => {



});

httpServer.listen(3000);