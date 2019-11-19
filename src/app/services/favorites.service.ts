import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/internal/operators/map';

export interface Favorite {
  userId: any;
  guiaId: any;
  userName:string;
  guiaName:string;
  guiaFoto:string;
  ativo:boolean;
}



@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private afs: AngularFirestore) { }

  // favorites that belong to a user
  getFavorites(userId, guiaId) {
    return this.afs.collection('favorites', ref => ref.where('userId', '==', userId).where('guiaId', '==' , guiaId)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  getFovorite(userId, guiaId) {
    const favoritePath = `favorites/${userId}_${guiaId}`;
    return this.afs.doc(favoritePath).valueChanges();
  }

  // Get all favorites that belog to a Guia
  getGuiaFavorites(guiaId) {
    const favoritesRef = this.afs.collection('favorites', ref => ref.where('guiaId', '==', guiaId) );
    return favoritesRef.valueChanges();
  }

  // Create or update favorites
  setFavorite(userId, userName, guiaId, guiaName, guiaFoto, ativo) {
    // Star document data
    const favorite: Favorite = { userId, userName, guiaId, guiaName, guiaFoto, ativo};

    // Custom doc ID for relationship
    const favoritePath = `favorites/${favorite.userId}_${favorite.guiaId}`;

    // Set the data, return the promise
    return this.afs.doc(favoritePath).set(favorite);
  }

  deleteFovorite(userId, guiaId) {
    const favoritePath = `favorites/${userId}_${guiaId}`;
    return this.afs.doc(favoritePath).delete();
  }

  getMeusFavoritos(userId) {
    //Ppegar da coleção um grupo de guias junto do ID com um parametro específico.
    return this.afs.collection('favorites', ref => ref.where('userId', '==', userId) ).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

}