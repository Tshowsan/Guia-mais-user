import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController, ToastController, PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SettingsComponent } from '../components/settings/settings.component';
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs/internal/Subscription';
import { NewsComponent } from '../components/news/news.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private loading: any;
  private user: User ={};
  private userSubscription: Subscription;


  constructor(
    public router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController
  ) {
    this.loadUser();
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
    this.limpar();
  }

  limpar(){
    this.user = null;
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
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  loadUser() {
    this.userSubscription = this.authService.getUser(this.authService.getAuth().currentUser.uid).subscribe(data => {
      this.user = data;
    });
  }

  async guiaRapido(){
    this.router.navigate(['/guia-rapido']);
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  async mostrarOpcoes(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: SettingsComponent,
      event: ev,
      animated: true,
      mode: 'ios',
      showBackdrop: true
    });

      return await popover.present();

  }

  async mostrarModal() {
    const modal = await this.modalCtrl.create({
      component: NewsComponent
    });
    modal.present();
  }

}
