import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeusFavoritosPage } from './meus-favoritos.page';

const routes: Routes = [
  {
    path: '',
    component: MeusFavoritosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MeusFavoritosPage]
})
export class MeusFavoritosPageModule {}
