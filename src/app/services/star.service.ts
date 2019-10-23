import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';

export interface Star {
  userId: any;
  guiaId: any;
  value: number;
}


@Injectable()
export class StarService {

  constructor(private afs: AngularFirestore) { }

  // Star reviews that belong to a user
  getUserStars(userId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId) );
    return starsRef.valueChanges();
  }

  // Get all stars that belog to a Movie
  getGuiaStars(guiaId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('movieId', '==', guiaId) );
    return starsRef.valueChanges();
  }

  // Create or update star
  setStar(userId, guiaId, value) {
    // Star document data
    const star: Star = { userId, guiaId, value };

    // Custom doc ID for relationship
    const starPath = `stars/${star.userId}_${star.guiaId}`;

    // Set the data, return the promise
    return this.afs.doc(starPath).set(star)
  }

}
