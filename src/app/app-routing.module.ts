import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './guards/logged.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),canActivate:[AuthGuard]
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule',canActivate:[LoggedGuard] },
  { path: 'usuario-cadastrar', loadChildren: './pages/usuario-cadastrar/usuario-cadastrar.module#UsuarioCadastrarPageModule',canActivate:[LoggedGuard] },
  // { path: 'details', loadChildren: './pages/details/details.module#DetailsPageModule',canActivate:[AuthGuard] },
  { path: 'details/:id', loadChildren: './pages/details/details.module#DetailsPageModule',canActivate:[AuthGuard] },
  { path: 'guia-rapido', loadChildren: './pages/guia-rapido/guia-rapido.module#GuiaRapidoPageModule',canActivate:[AuthGuard] }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
