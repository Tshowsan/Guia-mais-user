import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  private loading: any;

  constructor( 
    public router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController) { }

  ngOnInit() {}

  async meusDados(){
    this.router.navigate(['/meus-dados']);
    this.popoverCtrl.dismiss();

  }

  async editarSenha(){
    this.router.navigate(['/change-password']);
    this.popoverCtrl.dismiss();

  }

  async guiaRapido(){
    this.router.navigate(['/guia-rapido']);
    this.popoverCtrl.dismiss(); 
  }

  async logout() {
    await this.presentLoading();

    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
    this.popoverCtrl.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

}
