import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  public user: User = {};
  private userSubscription: Subscription;
  private loading: any;
  public password : string;
  public newpassword : string;
  

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router : Router
  ) {
    if (this.user) this.loadUser();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  loadUser() {
    this.userSubscription = this.authService.getUser(this.authService.getAuth().currentUser.uid).subscribe(data => {
      this.user = data;
    });
  }

  async updateUser(){
    // await this.presentLoading();
    await this.authService.updateUser(this.authService.getAuth().currentUser.uid,this.user)
    // await this.loading.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  async updatePassword(){

    if(!this.password){
      return this.presentToast('Insira a senha atual');
    }
    if(this.password != this.user.password && !this.newpassword){
      return this.presentToast('Senha atual incorreta');
    }
    if(this.password != this.user.password && this.newpassword){
      return this.presentToast('Senha atual incorreta');
    }
    if(this.password == this.user.password && !this.newpassword){
      return this.presentToast('Insire a nova senha');
    }
    
    else{     
      try{
        await this.presentLoading();
      this.user.password = this.newpassword;
      this.authService.updatePassword(this.newpassword);
      this.updateUser();
      this.router.navigate(['/tabs/tab2'])
      await this.loading.dismiss();
      return this.presentToast('Senha alterada com sucesso');
      
      

    }catch(error){
      console.error(error);
      let menssage:string;
      switch(error.code){
        case 'auth/requires-recent-login':
          menssage ='Esta e uma operação sensivel entre novamente no app para atualizar sua senha'
          return this.presentToast(menssage);
      }
    }
  }
}

}
