import { io } from 'socket.io-client';

const socketIo = io('http://localhost:3333', {
  transports: ['websocket'],
});

export default socketIo;
