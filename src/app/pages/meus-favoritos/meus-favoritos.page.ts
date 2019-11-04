import { AuthService } from 'src/app/services/auth.service';

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Favorite } from 'src/app/interfaces/favorites';

@Component({
  selector: 'app-meus-favoritos',
  templateUrl: './meus-favoritos.page.html',
  styleUrls: ['./meus-favoritos.page.scss'],
})
export class MeusFavoritosPage implements OnInit {

  private favoriteSubscription: Subscription;
  public favorites= new Array<Favorite>();

  constructor(
    private favoriteService: FavoritesService,
    private authService : AuthService,
  ) { 
    this.favoriteSubscription = this.favoriteService.getMeusFavoritos(this.authService.getAuth().currentUser.uid).subscribe(data => {
      this.favorites = data;
  });
}

  ngOnInit() {
  }

  ngOnDestroy() {
    this.favoriteSubscription.unsubscribe();
  }


}
