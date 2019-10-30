import { GuiaService } from './../services/guia.service';
import { User } from './../interfaces/user';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';
import { Guia } from '../interfaces/guia';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private loading: any;
  public guias = new Array<Guia>();
  private guiaSubscription: Subscription;

  constructor(
    private guiaService: GuiaService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.guiaSubscription = this.guiaService.getGuiaAtivo().subscribe(data => {
      this.guias = data;
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.guiaSubscription.unsubscribe();
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
