import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  @Input() userId;
  @Input() guiaId;
  @Input() userFoto;
  @Input() guiaFoto;
  @Input() userName;
  @Input() guiaName;
  text: string;

  chats: Observable<any>;
  // avgRating: Observable<any>;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chats = this.chatService.getGuiaChats(this.guiaId)

    // this.avgRating = this.stars.map(arr => {
    //   const ratings = arr.map(v => v.value)
    //   return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed'
    // })
  }

  chatHandler(text) {
    this.chatService.setChat(this.userId, this.userName, this.userFoto, this.guiaFoto, this.guiaId, this.guiaName)
  }

}
