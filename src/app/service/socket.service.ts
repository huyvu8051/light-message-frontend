import {EventEmitter, Injectable} from '@angular/core'
import {io, Socket} from 'socket.io-client'
import {Message} from './message.service'

@Injectable({
  providedIn: 'root'
})
export class SocketService{
  private socket: Socket;
  onMessage$ = new EventEmitter<Message>()

  constructor() {
    this.socket = io({
      transports: ['websocket']
    });

    this.socket.on("connect", () => {
      console.log('connected')
      this.socket.emit("message", "em cua ngay hom qua")
    });


    this.socket.on("message", (msg) => {
      console.log('message', msg)
      this.onMessage$.next(msg)
    });

    this.socket.on("disconnect", () => {
      console.log('disconnected')
    });
  }
}
