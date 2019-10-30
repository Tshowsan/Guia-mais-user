import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Subscription } from 'rxjs/internal/Subscription';
import { GuiaService } from 'src/app/services/guia.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-guia-rapido',
  templateUrl: './guia-rapido.page.html',
  styleUrls: ['./guia-rapido.page.scss'],
})
export class GuiaRapidoPage implements OnInit {
  private loading: any;
  public users = new Array<User>();
  private guiaSubscription: Subscription;

  constructor(
    private guiaService: GuiaService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.guiaSubscription = this.guiaService.getGuiaRapido().subscribe(data => {
      this.users = data;
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
