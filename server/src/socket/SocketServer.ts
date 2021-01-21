import { ServerOptions, Socket } from 'socket.io';

const socketIo = require('socket.io');

class SocketServer {
  private io: Socket;

  constructor(server: ServerOptions) {
    this.io = socketIo(server);
    this.io.on('connection', (socket: Socket) => {
      console.log(`New client connected with id: ${socket.id}`);
    });
  }

  emiter(event: string, body: any[]): void {
    if (body) {
      this.io.emit(event, body);
    }
  }
}

export default SocketServer;
