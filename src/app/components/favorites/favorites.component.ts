import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FavoritesService } from 'src/app/services/favorites.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {

  
  @Input() userId;
  @Input() guiaId;
  @Input() userName;
  @Input() guiaName;
  @Input() guiaFoto;
  control: boolean;
  private loading: any;

  favorite: Observable<any>;
  // avgRating: Observable<any>;

  constructor(
    private favoritesService: FavoritesService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {
    this.favorite = this.favoritesService.getUserFavorites(this.userId,this.guiaId)

    // this.avgRating = this.stars.map(arr => {
    //   const ratings = arr.map(v => v.value)
    //   return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed'
    // })
  }

  async favoriteHandler(control) {
    await this.presentLoading();
    if(control !== true){
    this.favoritesService.setFavorite(this.userId, this.userName, this.guiaId, this.guiaName, this.guiaFoto, this.control)
      await this.loading.dismiss();
      this.presentToast('Guia favoritado com sucesso');
    }else{
      this.favoritesService.deleteFovorite(this.userId,this.guiaId);
      await this.loading.dismiss();
      this.presentToast('Guia removido dos favoritos');
    }
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
