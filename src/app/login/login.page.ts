import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loading: any;
  private user: User ={};

  tipo: boolean;
  
  constructor(
    public router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.limpar();
  }


  async logar(){
    await this.presentLoading();
   
    try {
      await this.authService.login(this.user);
    this.router.navigate(['/tabs/tab1'])
    } catch (error) {
      console.log(error);
      let message: string;
      switch(error.code){
        case 'auth/argument-error':
          message = 'e-mail ou senha invalidos';
          break;
          case 'auth/wrong-password':
              message = 'Senha incorreta';
              break;
              case 'auth/user-not-found':
                message = 'e-mail não cadastrado';
                break;
              
      }
      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }
  }  


  cadastrar() {
    this.router.navigate(['/usuario-cadastrar'])
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  limpar() {
    this.user = null;
  }

  exibirOcultar() {
    this.tipo = !this.tipo;
  }

}
