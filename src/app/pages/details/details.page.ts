import { Guia } from './../../interfaces/guia';
import { GuiaService } from './../../services/guia.service';
import { User } from './../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private guiaId: string = null;
  private userId: string = null;
  public guia: Guia = {};
  public user: User = {};
  private loading: any;
  private userSubscription: Subscription;
  private guiaSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private guiaService: GuiaService,
    private toastCtrl: ToastController,
    private authService: AuthService
  ){
    
    this.guiaId = this.activatedRoute.snapshot.params['id'];
    this.userId = this.authService.getAuth().currentUser.uid;

    if (this.guiaId) this.loadGuia();
    if (this.userId) this.loadUser();
  }

  ngOnInit() { 

  }

  ngOnDestroy() {
    if (this.guiaSubscription) this.guiaSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  loadGuia() {
    this.guiaSubscription = this.guiaService.getGuia(this.guiaId).subscribe(data => {
      this.guia = data;
    });
  }

  loadUser() {
    this.userSubscription = this.authService.getUser(this.authService.getAuth().currentUser.uid).subscribe(data => {
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

}

