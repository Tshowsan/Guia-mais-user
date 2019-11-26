import { Chat } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { GuiaService } from 'src/app/services/guia.service';
import { AuthService } from 'src/app/services/auth.service';
import { Guia } from 'src/app/interfaces/guia';
import { User } from 'src/app/interfaces/user';
import { Subscription, Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  private guiaId: string = null;
  private userId: string = null;
  public guia: Guia = {};
  public user: User = {};
  private loading: any;
  private userSubscription: Subscription;
  private guiaSubscription: Subscription;
  private chatSubscription: Subscription;

  chats = new Array<Chat>();
  
  constructor(
    public router: Router, 
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private guiaService: GuiaService,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private chatService: ChatService
  ) { 

    this.guiaId = this.activatedRoute.snapshot.params['id'];
    this.userId = this.authService.getAuth().currentUser.uid;

    if (this.guiaId) this.loadGuia();
    if (this.userId) this.loadUser();

    this.chatSubscription = this.chatService.getUserChats(this.userId).subscribe(data => {
      this.chats = data;
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.guiaSubscription) this.guiaSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  chatHandler() {
    this.chatService.setChat(this.userId, this.user.nome, this.user.foto, this.guia.foto, this.guiaId, this.guia.nome)
    // this.router.navigate(['/mensagens/this.userId_this.guiaId'])
  }

  loadGuia() {
    this.guiaSubscription = this.guiaService.getGuia(this.guiaId).subscribe(data => {
      this.guia = data;
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

}
