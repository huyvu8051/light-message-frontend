import {Injectable} from '@angular/core'
import {io, Socket} from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketService{
  private socket: Socket;

  constructor() {
    this.socket = io('/chat');

    this.socket.on("connect", () => {
      console.log('connected')
    });
    this.socket.on("disconnect", () => {
      console.log('disconnected')
    });
  }
}
