import { MensagensService } from './../../services/mensagens.service';
import { Observable, Subscription } from 'rxjs';
import { Chat } from './../../services/chat.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mensagens } from 'src/app/services/mensagens.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.page.html',
  styleUrls: ['./mensagens.page.scss'],
})
export class MensagensPage implements OnInit {

  @ViewChild(IonContent, {static: false}) content: IonContent;

  public chat: Chat ={};
  public chatId: string = null;
  public mensagens: Observable<any>
  public text: string
  public userId: string;
  public userSubscription: Subscription;
  public user: User;

  public mensagensForm: FormGroup;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private mensagensService : MensagensService) 
  {
    this.userId = this.authService.getAuth().currentUser.uid
    if (this.userId) this.loadUser();
    this.chatId = this.activatedRoute.snapshot.params['id'];
   

   this.mensagensForm = this.formBuilder.group({
    'text': [null, Validators.compose([
      Validators.required,
    ])]
  })
 }

  ngOnInit() {
    this.mensagens = this.mensagensService.getMensagens(this.chatId)
    
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  ScrollToBottom(){
    this.content.scrollToBottom(1500 + 100);
  }

  mensagensHandler(text) {
    this.mensagensService.addMensagen(this.chatId, this.userId,this.user.nome, text)

    this.text = null;

    this.ScrollToBottom();

  }

  loadUser() {
    this.userSubscription = this.authService.getUser(this.authService.getAuth().currentUser.uid).subscribe(data => {
      this.user = data;
    });
  }

}
