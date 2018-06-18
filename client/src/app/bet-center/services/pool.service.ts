import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pool } from '../../models/pool';

@Injectable({
  providedIn: 'root'
})
export class PoolService {

  private poolSource = new BehaviorSubject(new Pool);
  currentPool = this.poolSource.asObservable();

  constructor() { }

  changeMessage(pool: Pool) {
    this.poolSource.next(pool);
  }
}
