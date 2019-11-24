import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

}
