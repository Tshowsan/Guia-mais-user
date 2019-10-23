import { GuiaService } from './../../services/guia.service';
import { User } from './../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private guiaId: string = null;
  // private guiaId: string = null;
  public user: User = {};
  private loading: any;
  private userSubscription: Subscription;

  // userDoc: AngularFirestoreDocument<any>;
  // guiaDoc: AngularFirestoreDocument<any>;
  
  // user2: Observable<any>;
  // guia: Observable<any>; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private guiaService: GuiaService,
    private toastCtrl: ToastController,
    private afs: AngularFirestore
  ) {
    this.guiaId = this.activatedRoute.snapshot.params['id'];

    if (this.guiaId) this.loadGuia();
  }

  ngOnInit() { 
    // this.userDoc = this.afs.doc('users/test-user-3')
    // this.guiaDoc = this.afs.doc('movies/battlefield-earth')

    // this.guia = this.guiaDoc.valueChanges()
    // this.user2 = this.userDoc.valueChanges()

  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  loadGuia() {
    this.userSubscription = this.guiaService.getGuia(this.guiaId).subscribe(data => {
      this.user = data;
    });
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  // get guiaId() {
  //   return this.guiaDoc.ref.id
  // }

  // get userId2() {
  //   return this.userDoc.ref.id
  // }

}

