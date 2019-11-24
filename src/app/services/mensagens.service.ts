import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Mensagens{
  chatId?: string;
  text?: string;
  userId?: any;
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
    const commentRef = this.afs.collection('mensagens', ref => ref.where('chatId', '==', chatId) );
    return commentRef.valueChanges();
  }

  addMensagen(chatId, userId, text){
    const mensagem : Mensagens = {chatId, userId, text}

    return this.mensagenCollection.add(mensagem);
  }

}
