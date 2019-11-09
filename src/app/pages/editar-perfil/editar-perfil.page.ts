import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from 'src/app/interfaces/user';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  public user: User = {};
  private userSubscription: Subscription;
  private loading: any;
  public form : NgForm;
  
  public usuarioEditarForm: FormGroup;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
  ) {
    if (this.user) this.loadUser();

    this.usuarioEditarForm = this.formBuilder.group({
      'nome': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30) 
      ])],
      'telefone': [null, Validators.compose([
        Validators.required, 
        // Validators.pattern('^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))$')
      ])]
    })
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
    await this.presentLoading();
    await this.authService.updateUser(this.authService.getAuth().currentUser.uid,this.user)
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

}
