import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { timestamp } from 'rxjs/operators';

export interface Mensagens{
  chatId?: string;
  text?: string;
  userId?: any;
  Timestamp?:any;
}

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  private mensagenCollection: AngularFirestoreCollection<Mensagens>;
  constructor(private afs: AngularFirestore) 
  {
    this.mensagenCollection = this.afs.collection<Mensagens>('mensagens');
   }

  // Comments that belong to a user
  getMensagens(chatId) {
    const commentRef = this.afs.collection('mensagens', ref=>ref.orderBy('Timestamp').where('chatId', '==', chatId) );
    return commentRef.valueChanges();
  }

  addMensagen(chatId, userId, text){
    const Timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const mensagem : Mensagens = {chatId, userId, text ,Timestamp}

    return this.mensagenCollection.add(mensagem);
  }

}
