import { MensagensService } from './../../services/mensagens.service';
import { Observable } from 'rxjs';
import { Chat } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mensagens } from 'src/app/services/mensagens.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.page.html',
  styleUrls: ['./mensagens.page.scss'],
})
export class MensagensPage implements OnInit {

  public chat: Chat ={};
  public chatId: string = null;
  public mensagens: Observable<any>
  public text: string

  constructor( 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private mensagensService : MensagensService) 
  {
    this.chatId = this.activatedRoute.snapshot.params['id'];
   }

  ngOnInit() {
    this.mensagens = this.mensagensService.getMensagens(this.chatId)
  }

  mensagensHandler(text) {
    this.mensagensService.addMensagen(this.chatId, this.authService.getAuth().currentUser.uid, text)

  }

}
