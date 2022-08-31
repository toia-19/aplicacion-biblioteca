import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'autor',
    loadChildren: () => import('./pages/autor/autor.module').then( m => m.AutorPageModule)
  },
  {
    path: 'ibiblioteca',
    loadChildren: () => import('./pages/ibiblioteca/ibiblioteca.module').then( m => m.IbibliotecaPageModule)
  },  {
    path: 'curriculum',
    loadChildren: () => import('./pages/curriculum/curriculum.module').then( m => m.CurriculumPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
