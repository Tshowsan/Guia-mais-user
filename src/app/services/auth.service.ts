import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<User>;
  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore
    ) {
    this.userCollection = this.afs.collection<User>('Usuarios');
     }

  login(user: User) {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User) {
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.afa.auth.signOut();
  }

  getAuth() {
    return this.afa.auth;
  }

  getUsers() {
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

  // getGuias(nome:string) {
  //   return this.userCollection.doc<User>(nome).snapshotChanges().pipe(
  //     map(actions => {
  //         const data = actions.payload.data();
  //         const id = actions.payload.id;
  //         return { id, ...data };
       
  //     })
  //   );
  // }

  getUser(id: string) {
    return this.userCollection.doc<User>(id).valueChanges();
  }

  updateUser(id: string, user: User) {
    return this.userCollection.doc<User>(id).update(user);
  }

  // deleteProduct(id: string) {
  //   return this.userCollection.doc(id).delete();
  // }
  
  // getGuia(){
  //   let citiesRef = this.afs.collection('cities');
  //   let query = citiesRef.where('capital', '==', true).get()
  //     .then(snapshot => {
  //       if (snapshot.empty) {
  //         console.log('No matching documents.');
  //         return;
  //       }
    
  //       snapshot.forEach(doc => {
  //         console.log(doc.id, '=>', doc.data());
  //       });
  //     })
  //     .catch(err => {
  //       console.log('Error getting documents', err);
  //     });

  // }
}