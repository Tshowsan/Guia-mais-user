import { Subscription } from 'rxjs/internal/Subscription';
import { GuiaService } from './../../services/guia.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StarService } from 'src/app/services/star.service';
import 'rxjs/add/operator/map'
import { Guia } from 'src/app/interfaces/guia';
import { ToastController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss'],
})
export class StarReviewComponent implements OnInit {
 
  @Input() userId;
  @Input() guiaId;
  @Input() userName;
  @Input() guiaName;

  stars: Observable<any>;
  avgRating: Observable<any>;
  private guiaSubscription: Subscription;
  public guia: Guia = {};
  public avaliacao: number;
  private loading: any;

  constructor(
    private starService: StarService,
    private guiaService: GuiaService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,) { }

  ngOnInit() {
    this.stars = this.starService.getGuiaStars(this.guiaId)

    this.avgRating = this.stars.map(arr => {
      const ratings = arr.map(v => v.value)
      this.avaliacao = ratings.reduce((total, val) => total + val) / arr.length;
      return ratings.reduce((total, val) => total + val) / arr.length;
    })
  }

  ngOnDestroy() {
    if (this.guiaSubscription) this.guiaSubscription.unsubscribe();
    this.limpar();
  }

  async starHandler(value) {

    await this.presentLoading();
    this.starService.setStar(this.userId, this.userName, this.guiaId, this.guiaName, value);
    await this.loading.dismiss();
    this.avgRating = this.stars.map(arr => {
      const ratings = arr.map(v => v.value)
      this.avaliacao = ratings.reduce((total, val) => total + val) / arr.length;
      return ratings.reduce((total, val) => total + val) / arr.length;
    })
    this.guia.avaliacao = this.avaliacao.toFixed(1)
    this.updateGuia();
    
  
  }

  loadGuia() {
    this.guiaSubscription = this.guiaService.getGuia(this.guiaId).subscribe(data => {
      this.guia = data;
    });
  }

  limpar(){
    this.guia = null;
  }

  async updateGuia(){
    await this.guiaService.updateGuia(this.guiaId,this.guia)
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
