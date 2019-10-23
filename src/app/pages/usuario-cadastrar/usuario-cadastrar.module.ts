import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UsuarioCadastrarPage } from './usuario-cadastrar.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioCadastrarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsuarioCadastrarPage]
})
export class UsuarioCadastrarPageModule {}
