import { GuiaService } from './../services/guia.service';
import { User } from './../interfaces/user';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private loading: any;
  public users = new Array<User>();
  private userSubscription: Subscription;

  constructor(
    private guiaService: GuiaService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.userSubscription = this.guiaService.getGuias().subscribe(data => {
      this.users = data;
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
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
