import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Socket } from 'ngx-socket-io';
import { Document } from '../_models/document';
import { map } from 'rxjs/operators';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io('https://api.dufferz.net/socket/');
  }

  // EMITTER
  sendMessage(msg: string) {
    this.socket.emit('sendMessage', { message: msg });
  }

  // HANDLER
  onNewMessage() {
    return Observable.create(observer => {
      this.socket.on('newMessage', msg => {
        observer.next(msg);
      });
    });
  }
}
