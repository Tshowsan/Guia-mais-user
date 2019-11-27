import { Favorite } from './../../interfaces/favorites';
import { Subscription } from 'rxjs/internal/Subscription';
import { FavoritesService } from './../../services/favorites.service';
import { Guia } from './../../interfaces/guia';
import { GuiaService } from './../../services/guia.service';
import { User } from './../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

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
  public favoritado: boolean;
  public favorite = new Array<Favorite>();
  private loading: any;
  private userSubscription: Subscription;
  private guiaSubscription: Subscription;
  private favoriteSubscription : Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private guiaService: GuiaService,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private favoritesService: FavoritesService,
    private chatService: ChatService
  ){
    
    this.guiaId = this.activatedRoute.snapshot.params['id'];
    this.userId = this.authService.getAuth().currentUser.uid;

    if (this.guiaId) this.loadGuia();
    if (this.userId) this.loadUser();
    this.loadFavorite();
    if(this.userSubscription) this.guiaFavoritado();
    
  }

  ngOnInit() { 

  }


  ngOnDestroy() {
    if (this.guiaSubscription) this.guiaSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  chatHandler() {
    this.chatService.setChat(this.userId, this.user.nome, this.user.foto, this.guia.foto, this.guiaId, this.guia.nome)
  }

  loadGuia() {
    this.guiaSubscription = this.guiaService.getGuia(this.guiaId).subscribe(data => {
      this.guia = data;
    });
  }

  loadFavorite(){
    this.favoriteSubscription = this.favoritesService.getFavorites(this.userId, this.guiaId).subscribe(data => {
      this.favorite = data;
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

  guiaFavoritado(){
    this.favoritado = true;
  }
}

