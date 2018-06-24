import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core';
import { HomeComponent } from './home/home.component';
import { PoolComponent } from './pool/pool.component';
import { PoolResolver } from '../core/resolvers/pool.resolver';

const routes: Routes = [
  Route.withShell([
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
      data: {
        // Uses static text (Home)
        breadcrumbs: 'Home'
      }
    },
    {
      path: 'home',
      component: HomeComponent,
      data: {
        title: 'Home',
        breadcrumbs: 'Home'
      }
    },
    {
      path: 'pool',
      data: {
        breadcrumbs: true,
        text: 'Pools',
        title: 'Pools'
      },
      children: [
        {
            path: '',
            component: HomeComponent
        },
        {
            path: ':id',
            component: PoolComponent,
            data: {
              // Interpolates values resolved by the router
              title: 'Pool Details',
              breadcrumbs: '{{ pool.label }}'
            },
            resolve: {
              pool: PoolResolver
            }
        }
      ]
    },
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BetCenterRoutingModule { }
