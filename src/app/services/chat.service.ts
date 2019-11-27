import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface Chat {
  id?:any;
  userId?: any;
  guiaId?: any;
  userName?:string;
  guiaName?:string;
  userFoto?:string;
  guiaFoto?:string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public router: Router,
    private afs: AngularFirestore) { }

    // Chats that belong to a user
    getUserChats(userId) {
      return this.afs.collection('chats', ref => ref.where('userId', '==', userId) ).snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
  
            return { id, ...data };
          });
        })
      );
    }
    // Get all chats that belog to a Guia
    getGuiaChats(guiaId) {
      const chatsRef = this.afs.collection('chats', ref => ref.where('guiaId', '==', guiaId) );
      return chatsRef.valueChanges();
    }

    getChats(userId, guiaId) {
      const chatPath = `chats/${userId}_${guiaId}`;
      return this.afs.collection(chatPath).snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
  
            return { id,...data };
          });
        })
      );
    }

    deleteChatId(id) {
      const chatPath = `chats/${id}`;
      return this.afs.doc(chatPath).delete();
    }

    getUserGuiaChats(userId, guiaId) {
      const chatPath = `chats/${userId}_${guiaId}`;
      return this.afs.doc(chatPath).valueChanges();
    }
  
    // Create or update chat
    setChat(userId, userName, userFoto, guiaFoto, guiaId, guiaName) {
      // comment document data
      const chat: Chat = { userId, userName, userFoto, guiaFoto, guiaId, guiaName};
  
      // Custom doc ID for relationship
      const chatPath = `chats/${chat.userId}_${chat.guiaId}`;

      this.router.navigate([`mensagens/${chat.userId}_${chat.guiaId}`])
  
      // Set the data, return the promise
      return this.afs.doc(chatPath).set(chat)
    }
}
