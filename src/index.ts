import express, { Request, Response } from 'express'
import path from 'path'
import { createServer } from 'http';
import { Server, Socket, 
  // importar tipeados
  Namespace,
} from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

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

// no podemos hacer lo de esta manera porque sino envía al 
// namespace por defecto
// io.on("connection", (socket: ExtendedSocket) => {

  /*
    los namespace son grupos, similar a salas de chat, pero
    no lo son, una sala de chat puedes unir a personas especificas
    para hablar.

    ahora con namespace se puede hacer es crear un namespace donde
    solo ingresen los admins y de ahí crear una sala de chat con
    ciertos admins.

    este es un ejemplo de caso de namespace
  */

// });

const teachers: Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> = io.of("teachers");
const students: Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> = io.of("students");

teachers.on("connection", socket => {
  console.log(socket.id + " se ha conectado a la sala de profesores");

  socket.on("send message", data => {
    teachers.emit("message", data);
  });

});

students.on("connection", socket => {
  console.log(socket.id + " se ha conectado a la sala de estudiantes");

  socket.on("send message", data => {
    students.emit("message", data);
  });
});

httpServer.listen(3000);

// On → Se usa para detectar (o escuchar) un evento varias veces.
// Once → Se usa para detectar (o escuchar) un evento una sola vez. Sin importar si el evento se emite varias veces.
// Off → Se usa para dejar de escuchar un evento, sin importar que este se siga emitiendo.