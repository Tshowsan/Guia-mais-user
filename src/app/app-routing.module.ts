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
  { path: 'guia-rapido', loadChildren: './pages/guia-rapido/guia-rapido.module#GuiaRapidoPageModule',canActivate:[AuthGuard] },
  { path: 'editar-perfil', loadChildren: './pages/editar-perfil/editar-perfil.module#EditarPerfilPageModule',canActivate:[AuthGuard] },
  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule',canActivate:[LoggedGuard] },
  { path: 'change-password', loadChildren: './pages/change-password/change-password.module#ChangePasswordPageModule',canActivate:[AuthGuard] },
  { path: 'meus-favoritos', loadChildren: './pages/meus-favoritos/meus-favoritos.module#MeusFavoritosPageModule',canActivate:[AuthGuard] },
  { path: 'meus-dados', loadChildren: './pages/meus-dados/meus-dados.module#MeusDadosPageModule',canActivate:[AuthGuard] }
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
