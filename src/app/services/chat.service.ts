import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface Chat {
  userId?: any;
  guiaId?: any;
  userName?:string;
  guiaName?:string;
  userFoto?:string;
  guiaFoto?:string;
  text?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private afs: AngularFirestore) { }

    // Chats that belong to a user
    getUserChats(userId) {
      const chatsRef = this.afs.collection('chats', ref => ref.where('userId', '==', userId) );
      return chatsRef.valueChanges();
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
  
            return { ...data };
          });
        })
      );
    }

    getUserGuiaChats(userId, guiaId) {
      const chatPath = `chats/${userId}_${guiaId}`;
      return this.afs.doc(chatPath).valueChanges();
    }
  
    // Create or update chat
    setChat(userId, userName, userFoto, guiaFoto, guiaId, guiaName, text) {
      // comment document data
      const chat: Chat = { userId, userName, userFoto, guiaFoto, guiaId, guiaName, text};
  
      // Custom doc ID for relationship
      const chatPath = `chats/${chat.userId}_${chat.guiaId}`;
  
      // Set the data, return the promise
      return this.afs.doc(chatPath).set(chat)
    }
}
