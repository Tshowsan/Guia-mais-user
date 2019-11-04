import { CommentsService } from './../../services/comments.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {

  
  @Input() userId;
  @Input() guiaId;
  @Input() userFoto;
  @Input() userName;
  @Input() guiaName;
  text: string;

  comments: Observable<any>;
  // avgRating: Observable<any>;

  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    this.comments = this.commentsService.getGuiaComments(this.guiaId)

    // this.avgRating = this.stars.map(arr => {
    //   const ratings = arr.map(v => v.value)
    //   return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed'
    // })
  }

  commentHandler(text) {
    this.commentsService.setComment(this.userId, this.userName, this.userFoto, this.guiaId, this.guiaName, text)
  }

}
