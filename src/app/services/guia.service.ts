import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Guia } from '../interfaces/guia';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {
  
  private guiaCollection: AngularFirestoreCollection<Guia>;
  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore
    ) {
    this.guiaCollection = this.afs.collection<Guia>('Guias');
     }


  getGuias() {
    //Pegar todos os guias da coleção puxando o id de cada objeto.
    return this.guiaCollection.snapshotChanges().pipe(
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
    //Pegar da coleção um guia especifico.
    return this.guiaCollection.doc<Guia>(id).valueChanges();
  }

  updateGuia(id: string, guia: Guia) {
    return this.guiaCollection.doc<Guia>(id).update(guia);
  }

  getGuiaRapido() {
    //Ppegar da coleção um grupo de guias junto do ID com um parametro específico.
    return this.afs.collection('Guias', ref => ref.orderBy('avaliacao' ,"desc").where('plantao', '==', true) ).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  getGuiaAtivo() {
    //Ppegar da coleção um grupo de guias junto do ID com um parametro específico.
    return this.afs.collection('Guias', ref => ref.orderBy('avaliacao' ,"desc").where('ativo', '==', true) ).snapshotChanges().pipe(
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
