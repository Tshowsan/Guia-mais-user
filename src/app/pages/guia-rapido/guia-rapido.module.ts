import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GuiaRapidoPage } from './guia-rapido.page';

const routes: Routes = [
  {
    path: '',
    component: GuiaRapidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GuiaRapidoPage]
})
export class GuiaRapidoPageModule {}
