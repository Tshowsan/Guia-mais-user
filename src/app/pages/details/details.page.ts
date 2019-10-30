import { Guia } from './../../interfaces/guia';
import { GuiaService } from './../../services/guia.service';
import { User } from './../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private guiaId: string = null;
  public guia: Guia = {};
  private loading: any;
  private guiaSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private guiaService: GuiaService,
    private toastCtrl: ToastController,
  ){
    
    this.guiaId = this.activatedRoute.snapshot.params['id'];

    if (this.guiaId) this.loadGuia();
  }

  ngOnInit() { 

  }

  ngOnDestroy() {
    if (this.guiaSubscription) this.guiaSubscription.unsubscribe();
  }

  loadGuia() {
    this.guiaSubscription = this.guiaService.getGuia(this.guiaId).subscribe(data => {
      this.guia = data;
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

