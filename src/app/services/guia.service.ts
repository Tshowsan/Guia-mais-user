import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {
  
  private userCollection: AngularFirestoreCollection<User>;
  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore
    ) {
    this.userCollection = this.afs.collection<User>('Guias');
     }


  getGuias() {
    return this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }


  getGuia(id: string) {
    return this.userCollection.doc<User>(id).valueChanges();
  }

  getGuiaRapido() {
    const gr = this.afs.collection('Guias', ref => ref.where('ativo', '==', true) );
    return gr.valueChanges();
  }

}
