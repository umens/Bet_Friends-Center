import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Pool } from '../../models/pool';
import { PoolDataService } from '../../bet-center/services/pool-data.service';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

export interface IPool {
  id: string;
  label: string;
}

@Injectable()
export class PoolResolver implements Resolve<IPool> {

  constructor(private service: PoolDataService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPool> {

    const id = route.params.id;

    if (id) {
      return this.service.getPoolGraphQL(id).pipe(
        tap( // Log the result or error
          (data: IPool) => {
            return Observable.of({
              id: data.id,
              label: data.label
            });
          },
          error => { throw error; }
        )
      );
    } else {
      return Observable.of({
        id: null,
        label: null
      });
    }
  }
}
