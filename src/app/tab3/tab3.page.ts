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
  public loadedGuiaList: any[];
  textoBuscar = '';

  constructor(
    private guiaService: GuiaService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.guiaSubscription = this.guiaService.getGuiaAtivo().subscribe(data => {
      this.guias = data;
      this.loadedGuiaList = data;
    });
  }

  buscarUsuario( event ) {
    const texto = event.target.value;
    this.textoBuscar = texto;
  }

  ngOnInit() {
   }

  ngOnDestroy() {
    this.guiaSubscription.unsubscribe();
    this.limpar();
  }

  initializeItems(): void {
    this.guias = this.loadedGuiaList;
  }

  filterList(evt) {
    this.initializeItems();
  
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.guias = this.guias.filter(currentGuia => {
      if (currentGuia.nome && searchTerm) {
        if (currentGuia.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
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

  limpar(){
    this.guias = null;
  }
  
}
