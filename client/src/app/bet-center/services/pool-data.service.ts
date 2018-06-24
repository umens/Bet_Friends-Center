import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatchDay } from '../../models/match-day';
import { Pool } from '../../models/pool';
import { Observable } from 'rxjs';
import { IPool } from '../../core/resolvers/pool.resolver';
import { map } from 'rxjs/operators';

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

  getPoolGraphQL(id: String): Observable<IPool>  {
    return this.httpClient.post<any>(`graphql`, {
      query: `query { poolById(_id: "${id}") {_id,label }}`,
      variables: null
    }).pipe(
      map((data: any) => {
        return {
          id: data.data.poolById._id,
          label: data.data.poolById.label
        };
      })
    );
  }

  getAllCurrentBets(): Observable<MatchDay[]>  {
    return this.httpClient.get<MatchDay[]>('api/v1/currentMatchDay');
  }

}
