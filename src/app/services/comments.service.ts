import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { timestamp } from 'rxjs/operators';
import * as firebase from 'firebase';

export interface Comment {
  userId: any;
  guiaId: any;
  userName:string;
  guiaName:string;
  userFoto:string;
  text: string;
  Timestamp?:any;
}
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private afs: AngularFirestore) { }

  // Comments that belong to a user
  getUserComments(userId) {
    const commentRef = this.afs.collection('comments', ref => ref.where('userId', '==', userId) );
    return commentRef.valueChanges();
  }

  // Get all comments that belog to a Guia
  getGuiaComments(guiaId) {
    const starsRef = this.afs.collection('comments', ref => ref.orderBy('Timestamp',"desc").where('guiaId', '==', guiaId) );
    return starsRef.valueChanges();
  }

  // Create or update comment
  setComment(userId, userName,userFoto, guiaId, guiaName, text) {
    // comment document data
    const Timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const comment: Comment = { userId, userName, userFoto, guiaId, guiaName, text ,Timestamp };

    // Custom doc ID for relationship
    const commentPath = `comments/${comment.userId}_${comment.guiaId}`;

    // Set the data, return the promise
    return this.afs.doc(commentPath).set(comment)
  }

}

