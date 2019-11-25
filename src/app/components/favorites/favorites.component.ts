import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FavoritesService } from 'src/app/services/favorites.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Favorite } from 'src/app/interfaces/favorites';

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
  public favorites = {};
  private favoriteSubscription : Subscription;

  favorite: Observable<any>;

  constructor(
    private favoritesService: FavoritesService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public alertController: AlertController
    ) {
      this.favorites = null; 
      this.loadFavorite();
    }

  ngOnInit() {
    // this.favorite = this.favoritesService.getFavorites(this.userId,this.guiaId)
  }
  ngOnDestroy() {
    this.favorites = null;
    this.favoriteSubscription.unsubscribe();
  }

  async favoriteHandler() {
    await this.presentLoading();
    this.favoritesService.setFavorite(this.userId, this.userName, this.guiaId, this.guiaName, this.guiaFoto)
      // this.presentToast('Guia favoritado com sucesso');
      this.presentAlert();
      await this.loading.dismiss();

 
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  guiaFavoritado(){
    this.control = true;
  }

  loadFavorite(){
    this.favoriteSubscription = this.favoritesService.getFovorite(this.userId,this.guiaId).subscribe(data => {
      this.favorites = data;
      if(this.favorite !== null){
        this.control = true;
      }if(this.favorites == null){
        this.control = false;
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Guia favoritado com Sucesso',
      // subHeader: 'Subtitle',
      message: 'O guia podera ser facilmente encontrado nos meus favoritos.',
      buttons: ['Entendido']
    });

    await alert.present();
  }
}
