import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent, LoginComponent } from './core';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  // Fallback when no prior route is matched
  // { path: '**', redirectTo: '', pathMatch: 'full' }
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
