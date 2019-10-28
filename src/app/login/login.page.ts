import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
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
  
  constructor(
    public router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private alert: AlertController
    ) { }

  ngOnInit() {
  }


  async logar(){
    await this.presentLoading();
   
    try {
      await this.authService.login(this.user);
      // console.log("logado com sucesso")
    this.router.navigate(['/tabs/tab1'])
    } catch (error) {
      this.presentToast(error.message);
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

  // forgotpassword(){
  //   let prompt = this.alert.create({

  //     message:"Uma nova senha sera enviada para o seu email",
  //     inputs:[
  //       {
  //         name:'email',
  //         placeholder:'seuemail@exemplo.com'
  //       },
  //     ],
  //     buttons:[
  //       {
  //         text:'Cancelar',
  //         handler: data =>{
  //           console.log('cancelado')
  //         }
  //       },
  //       {
  //         text:'Submit',
  //         handler: data =>{
  //           //call user servide
  //         } 

  //       }
  //     ]
  //   });

  // }

}
