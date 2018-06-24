import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core';

const routes: Routes = [
  // Fallback when no prior route is matched
  // { path: '**', redirectTo: '', pathMatch: 'full' }
  { path: '**', component: NotFoundComponent, data: { title: '404 - Not Found' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
