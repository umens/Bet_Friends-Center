import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatchDay } from '../../models/match-day';
import { Pool } from '../../models/pool';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoolDataService {

  constructor(private httpClient: HttpClient) { }

  getPoolMatchDay(id: String): Observable<MatchDay>  {
    return this.httpClient.get<MatchDay>(`pool/${id}`);
  }

  getPool(id: String): Observable<Pool>  {
    return this.httpClient.get<Pool>(`pool/${id}`);
  }

  getAllCurrentBets(): Observable<MatchDay[]>  {
    return this.httpClient.get<MatchDay[]>('api/v1/currentMatchDay');
  }

}
